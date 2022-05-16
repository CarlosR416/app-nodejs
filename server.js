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


const server = require("http").Server(app)

// motor de platillas
const ejs = require("ejs")
const path = require("path")
app.set("views", path.join(__dirname, "/html"))
app.engine("ejs", ejs.__express)
app.set("view engine", "ejs")
app.use(express.static(__dirname+"/html"))

//Inicializacion del servidor en el puerto indicado
server.listen(port, function(){
    conexion_db.connect(function (err) {
        if (err) throw err
        console.log("servicio corriendo en http://localhost:"+port);
    })
});


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

app.get("/nosotros", function(request, response){
    response.render("pages/about")
})


// Manejador de error 404
app.use((req,res,next) => {
    res.status(404).send("page not fount")
    next()
})