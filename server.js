//varibales de entorno
require('dotenv').config()

//base de datos ------------------------//
require("./util/database")()
var conexion_db = connection()

var data = require("./util/data")
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

//validaciones
const  {check, validationResult}  = require('express-validator');
//importando rutas
const adminRoutes = require('./routes/admin')
const verifyToken = require('./routes/validate-token')


io.on("connection", function (socket) {

    console.log("usuario conectado");
    //socket.emit("mensaje", {mensaje: "Hola"})
    

    
    socket.on("Eliminar", function(datos){

        console.log(datos)

        let resp = `<table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Descripcion</th>
                          <th scope="col">Imagen</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>  
                        <tr>
                        <th scope="row">1</th>
                        
                        <td>arreglo grande con peluche</td>
                        <td>/assets/img/post-landscape-8.jpg</td>
                        <td>
                            <a href="/admin/producto/editar?id=" style="color: blue;">Editar </a>
                            <a href="/admin/producto/editar?id=" style="color: blue;">Eliminar</a>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        
                        <td>arreglo pequeño sin peluche</td>
                        <td>/assets/img/post-landscape-2.jpg</td>
                        <td>
                            <a href="/admin/producto/editar?id=" style="color: blue;">Editar </a>
                            <a href="/admin/producto/editar?id=" style="color: blue;">Eliminar</a>
                        </td>
                        </tr>        
                      </tbody>
                    </table>`

        socket.emit('carga-productos', resp)
        
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
    res.locals.errors = [];
    res.locals.success = [];

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

    let sql = data.productos_inicio()

    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err 
        
        response.render("pages/index", {productos: data})
    })
    
    
})

app.get("/ingresar", function(request, response){

    response.clearCookie("auth_token").render("pages/login");
    
})

app.post("/ingresar", [
        check('usuario')
        .not()
        .isEmpty()
        .isLength({min: 5})
        .withMessage('El usuario es incorrecto'),
        check("password")
        .not()
        .isEmpty()
        .isLength({min: 6})
        .withMessage('La contraseña es incorrecta')
    ], function(request, response){

    var error = validationResult(request).array()

    if(error.length > 0){
        console.log(error)
        return response.render("pages/login", {errors: error})
    }

    const {usuario, password} = request.body
    let token = 0

    let sql = `SELECT
                    *
                FROM
                    usuarios
                WHERE usuario = "${usuario}"`
    
    conexion_db.query(sql, function(err, data, fields){
        if(err){ 
            //pool.end()
            response.render("pages/login", {errors: [{msg: "Error de conexion con la base de datos"}]})
            //response.redirect(303, "/admin/dashboard")
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
                        response.render("pages/login", {errors: [{msg: "Contraseña incorrecta"}]})
                    }
                    
            
                })

               
            }else{
                
                response.render("pages/login", {errors: [{msg: "El usuario es incorrecto"}]})

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

app.post("/registro",  [
        check('usuario')
        .not()
        .isEmpty()
        .isLength({min: 5})
        .withMessage('El usuario debe tener mas de 5 caracteres')
        .not()
        .contains(' ')
        .withMessage("El usuario contiene caracteres no validos"),
        check('nombre')
        .not()
        .isEmpty()
        .isLength({min: 5})
        .withMessage('El nombre es requerido'),
        check('password', 'La contraseña es requerida, minimo 6 caracteres')
        .isLength({ min: 6 })
        .custom((val,  req, loc, path ) => {
            
            if (val !== req.req.body.confirm_password) 
                throw new Error("La cofirmacion de contraseña no coinciden");
            else 
                return val;
            
        })
    ], function(request, response){
    
        var error = validationResult(request).array()

        if(error.length > 0){
            
            return response.render("pages/registro", {errors: error})
        }

        const {usuario, password, nombre} = request.body

        bcrypt.hash(password, 10, function(err, hash){
            if(err) throw err
            

            let sql = `INSERT INTO usuarios (usuario, nombre, password) VALUES ("${usuario}", "${nombre}","${hash}")`


            conexion_db.query(sql, function(err, data, fields){
                if(err){
                    
                    var msg = '';
                    if(err.code == 'ER_DUP_ENTRY'){
                        msg = 'El usuario: ('+usuario+') ya existe en la base de datos';
                    }else{
                        msg = "No se puede registrar el usuario en la base de datos";
                    }
                    //pool.end()
                    return response.render("pages/registro", {errors: [{msg: msg}]}) 
                }else{
                    return response.render("pages/registro", {success: [{msg: "Usuario registrado correctamente"}]}) 
                }
            })

            
        })
        
})


app.get("/contactanos", function(request,  response){
    response.render("pages/contact")
})

app.post("/contactanos",[
    check('name')
    .not()
    .isEmpty()
    .withMessage('nombre es requerido'),
    check('message')
    .not()
    .isEmpty()
    .withMessage('Mensaje es requerido'),
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email es requerido')
    .isEmail()
    .withMessage('El Email debe ser un correo valido')
], function(request,  response){
    
    var error = validationResult(request).array()

    if(error.length > 0){
        return response.render('pages/contact', {errors: error})
    }
    const {message, name, email} = request.body

    
    let sql = `INSERT INTO contacto (nombre, correo, mensaje) VALUES ("${name}", "${email}", "${message}")`
    
    conexion_db.query(sql, function(err, data, fields){
        if(err){
            console.log(err)
            //pool.end()
            return response.render("pages/contact", {errors: [{msg: "Lo sentimos pero en este momento no podemos recibir tu mensaje"}]})
        }else{
            return response.render("pages/contact", {success: [{msg: "Hemos recibido tu mensaje con exito"}]})    
        }
    })


})

app.get("/productos", function(request, response){

    const search = request.query.s
    const category = request.query.c

    let sql = ''

    if(category){
        sql = `SELECT
                    c.id,
                    c.descripcion,
                    c.precio,
                    d.src AS imagen_src,
                    d.descripcion AS imagen_descripcion,
                    a.descripcion AS cate
                FROM
                    categorias a
                JOIN categorias_productos b ON
                    a.id = b.id_categoria
                JOIN productos c ON
                    b.id_producto = c.id
                JOIN img_producto d ON
                    c.id = d.id_producto
                WHERE a.id = "${category}"
                GROUP BY
                    a.id`
        
    }else if(search){

        sql = `SELECT
                    a.id,
                    a.descripcion,
                    a.precio,
                    b.src AS imagen_src,
                    b.descripcion AS imagen_descripcion
                FROM
                    productos a
                JOIN img_producto b ON
                    a.id = b.id_producto
                WHERE a.descripcion LIKE "%${search}%"
                GROUP BY
                    a.id` 
                    
    }else{

        sql = `SELECT
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

    }
    
    

    


    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err 
        productos = data
        
        let sql2 = `SELECT * FROM categorias`
                
        conexion_db.query(sql2, function(err, data2, fields){

            response.render("pages/products", {productos , categorias: data2})

        })
        
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
    res.status(404).send("page not fount")
    next()
})

