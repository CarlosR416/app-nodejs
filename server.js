//varibales de entorno
require('dotenv').config()

//base de datos ------------------------//
require("./util/database")()
var conexion_db = connection()
//--------------------------------------//

//servidor 
const port = process.env.SERVER_PORT //puerto de escucha
const express = require("express")
const app = express()
const parser = require("body-parser")
app.use(parser.urlencoded({extended: true}))

//cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

/* Dependencias ------------------------- */

// motor de platillas
const ejs = require("ejs")
const path = require("path")
app.set("views", path.join(__dirname, "/html"))
app.engine("ejs", ejs.__express)
app.set("view engine", "ejs")
app.use(express.static(__dirname+"/html"))


//web sockets
const server = require("http").Server(app)
const io = require("socket.io")(server)

//jsonwebtoken
const jwt = require('jsonwebtoken')

//cifrado de contraseña
bcrypt = require("bcrypt")

//importando rutas
const adminRoutes = require('./routes/admin');
const verifyToken = require('./routes/validate-token');


io.on("connection", function (socket) {

    console.log("usuario conectado");
    //socket.emit("mensaje", {mensaje: "Hola"})
    

    
    socket.on("getdata", function(datos){

        console.log(datos)
        
    })
    
    async function getAllUsersfromDB(){
        let sql = `SELECT * FROM usuario`
    
        var datos = await new Promise ((resolve, reject) => {
            
            conexion_db.query(sql, function(err, data, fields){
                if(err) return reject(err) 
                console.log("consulta exitosa"); 
                return resolve(data); 
            })

        })
        socket.emit("listar-usuarios", {datos})
    }


    //getAllUsersfromDB();
})


//Inicializacion del servidor en el puerto indicado
server.listen(port, function(){
    conexion_db.connect(function (err) {
        if (err) throw err
        console.log("servicio corriendo en http://localhost:"+port);
    })
});


app.use(function(req, res, next){
    const token = req.cookies.auth_token
    res.locals.admin = 0

    if (token){
        try {

            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified
            res.locals.admin = verified.nivel

        } catch (error) {
            res.locals.admin = 0
        }
    }
    
    next()
    
})

//rutas protegidas admin
app.use('/admin', verifyToken, adminRoutes);
 
// Rutas
app.get("/", function(request, response){

    let sql = `SELECT
                    a.id,
                    a.descripcion,
                    a.precio,
                    b.src AS imagen_src,
                    b.descripcion AS imagen_descripcion
                FROM
                    productos a
                JOIN img_producto b ON
                    a.id = b.id_producto
                GROUP BY
                    a.id
                LIMIT 3`


    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err 
        productos = data
        response.render("pages/index", {productos})
    })
    
    
})

app.get("/ingresar", function(request, response){

    response.clearCookie("auth_token").render("pages/login");
    
})

app.post("/auth", function(request, response){

    const {usuario, password} = request.body
    let token = 0

    let sql = `SELECT
                    *
                FROM
                    usuarios
                WHERE usuario = "${usuario}"`
    
    conexion_db.query(sql, function(err, data, fields){
        if(err){
            console.log(err)   
            //pool.end()
            request.send("no se pudo conectar a la base de datos <a href='/'>Regresar</a>"); 
        }else{
            
            if(typeof(data[0]) != "undefined"){
                
                bcrypt.compare(password, data[0].password, function(err, result){
                    if(err) throw err
    
                    if(result){

                        // crear token
                        token = jwt.sign({
                            name: data[0].usuario,
                            id: data[0].id,
                            nivel: data[0].nivel
                        }, process.env.TOKEN_SECRET, {expiresIn: "24h"})

                        response.cookie('auth_token', token, {expire : new Date() + 3600}).redirect(303, "/admin/dashboard");
                    }else{
                        response.send("Contraseña incorrecta: "+result)
                    }
                    
            
                })

               
            }else{

                response.send("No Existe El usuario")

            } 
            
        }
    })
    
   

    
    
})

app.get("/logout", function(request, response){

    
    response.clearCookie("auth_token").redirect(303, "/");    
    
})

app.get("/registro", function(requets, response){
    response.render("pages/registro.ejs")
})

app.get("/hash/:h", function(req,res){
    const ha = req.params.h
    let has = 0;
    bcrypt.hash(ha, 10, function(err, hash){
        if(err) throw err
        
        has = hash
       

        bcrypt.compare(ha, ha, function(err, result){
            res.send("s:"+result)
        })
    })
    
})

app.get("/registro/:nom/:pass", function(req, res){
    const {nom, pass} = req.params

    bcrypt.hash(pass, 10, function(err, hash){
        if(err) throw err
        

        let sql = `INSERT INTO usuarios (usuario, nombre, password) VALUES ("${nom}", "User","${hash}")`


        conexion_db.query(sql, function(err, data, fields){
            if(err){
                console.log(err)
                //pool.end()
                res.send("no se pudo conectar a la base de datos <a href='/'>Regresar</a>"); 
            }else{
                res.send("registro exitoso; "+hash+" <a href='/'>Regresar</a>") 
            }
        })
    })

})

app.get("/contactanos", function(request,  response){
    response.render("pages/contact")
})

app.post("/contactanos/mensaje", function(request,  response){
    const {message, name, email} = request.body
    response.send(request.params);
    if(message, name, email){
        let sql = `INSERT INTO contacto (nombre, correo, mensaje) VALUES ("${name}", "${email}", "${message}")`
        
        conexion_db.query(sql, function(err, data, fields){
            if(err){
                console.log(err)
                //pool.end()
                response.render("error/error", {msj: "Lo sentimos pero en este momento no podemos recibir tu mensaje"})
            }else{
                response.render("exito/exito", {msj: "Hemos recibido tu mensaje con exito"})    
            }
        })
    }else{
        response.render("error/error", {msj: "Upsss, al parecer existe un inconveninete con los datos suministrados"})
    }

})


app.get("/productos", function(request, response){

    let sql = `SELECT
                    a.id,
                    a.descripcion,
                    a.precio,
                    b.src AS imagen_src,
                    b.descripcion AS imagen_descripcion
                FROM
                    productos a
                JOIN img_producto b ON
                    a.id = b.id_producto
                GROUP BY
                    a.id`


    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err 
        productos = data

        response.locals.moo = "ssss";
        response.render("pages/products", {productos , admin: false})
    })

    
})

app.get("/admin/productos", function(request, response){

    let sql = `SELECT
                    a.id,
                    a.descripcion,
                    a.precio,
                    b.src AS imagen_src,
                    b.descripcion AS imagen_descripcion
                FROM
                    productos a
                LEFT JOIN img_producto b ON
                    a.id = b.id_producto
                GROUP BY
                    a.id`


    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err 
        productos = data
        response.render("productos/productos", {productos, admin: true})
    })

    
})

app.get("/admin/producto/editar", function(request, response){

    const {id} = request.query

    response.render("productos/editar_producto", {id})

})

app.post("/usuarios/agregar", function(req, res){

    const {nombre, rol, bloqueo} = req.body
    

    let sql = `INSERT INTO usuario (nom_usu, niv_acc, usu_blq) VALUES ("${nombre}", "${rol}", "${bloqueo}")`
    

    conexion_db.query(sql, function(err, data, fields){
        if(err){
            console.log(err)
            //pool.end()
            res.send("no se pudo conectar a la base de datos <a href='/'>Regresar</a>"); 
        }else{
            res.send("registro exitoso <a href='/'>Regresar</a> <br> <a href='/usuarios/listar'>listar usuarios</a>"); 
        }
    })

});

app.get("/usuarios/listar", function(req, res){

    let sql = `SELECT * FROM usuario`
    
    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err 
        res.render("listar_usu", {data}); 
    })

});

app.get("/nosotros", function(request, response){
    response.render("pages/about")
})


// manejador de error 404
app.use((req,res,next) => {
    res.status(404).render("404/404", {title: "Error 404"})
    next()
})

