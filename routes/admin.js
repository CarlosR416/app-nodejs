const router = require('express').Router()
//base de datos ------------------------//
require("../util/database")()
var conexion_db = connection()

var data = require("../util/data")
//--------------------------------------//

router.get('/productos', (req, res) => {
    res.send('mi ruta protegida'+res.locals.admin)
})

router.get('/dashboard', (req, res) => {

    let sql = `SELECT
                    a.id,
                    ROW_NUMBER() OVER(ORDER BY  id ASC) as nun,
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
        res.render("pages/dashboard", {productos})
    })
    
})

router.get("/agregar/producto", function(request, response){
    
    response.render("pages/add_product")

})

router.post("/agregar/producto", function(request, response){
    const {descripcion, precio} = request.body
    let imagen = request.files.imagen
    let img_name = "/productos/"+imagen.name

    imagen.mv(`html/assets/img/${img_name}`, err => {
        if(err) if(err) throw err
    })

    let sql = data.add_product(descripcion, precio, img_name)

    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err

        response.render("pages/add_product", {success: [{msg: "Producto agregado con exito"}]})
    })
})

router.post("/delete/producto/:id", function(req, res){
    const id = req.params.id

    let sql = data.del_product(id)

    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err 
        res.json({delete: true})
    })

})


module.exports = router