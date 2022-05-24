const router = require('express').Router()
//base de datos ------------------------//
require("../util/database")()
var conexion_db = connection()
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

router.post("/delete/producto/:id", function(req, res){
    const id = req.params.id

    let sql = `DELETE FROM productos WHERE id=${id}`

    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err 
        productos = data
        res.json({delete: true})
    })

})

module.exports = router