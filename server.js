const port = 3002 //puerto de escucha
const express = require("express")
const app = express()
const parser = require("body-parser")
app.use(parser.urlencoded({extended: true}))


const server = require("http").Server(app)


//Inicializacion del servidor en el puerto indicado
server.listen(port, function(){
    
    console.log("servicio corriendo en http://localhost:"+port);
    
});


// Rutas
app.get("/", function(request, response){


    
    response.send("Hola Mundo")    
    
    
})


// Manejador de error 404
app.use((req,res,next) => {
    res.status(404).send("page not fount")
    next()
})