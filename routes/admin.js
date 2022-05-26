const router = require('express').Router()
//base de datos ------------------------//
require("../util/database")()
var conexion_db = connection()

const res = require('express/lib/response')
var data = require("../util/data")
//--------------------------------------//

router.get('/productos', (req, res) => {
    res.send('mi ruta protegida'+res.locals.admin)
})

router.get('/dashboard', (req, res) => {

    let sql = data.get_dashboard()

    conexion_db.query(sql, function(err, data2, fields){
        if(err) throw err 

        productos = data2
        sql2 = data.get_categorys()

        conexion_db.query(sql2, function(err, data, fields){
            res.render("pages/dashboard", {productos, data})
        })
    })
    
})

router.get("/agregar/producto", function(request, response){
    
    let sql = data.get_categorys()

    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err

        response.render("pages/add_product", {data})

    }) 

    
})

router.post("/agregar/producto", function(request, response){
    const {descripcion, precio, visible, categoria} = request.body
    let imagen = request.files.imagen
    let img_name = "/productos/"+imagen.name

    imagen.mv(`html/assets/img/${img_name}`, err => {
        if(err) if(err) throw err
    })

    let sql = data.add_product(descripcion, precio, img_name, visible, categoria)

    conexion_db.query(sql, function(err, data3, fields){
        if(err) throw err

        let sql2 = data.CreateRelationCategory(categoria)

        conexion_db.query(sql2, function(err, data2, fields){
            if(err) throw err
            

            let sql3 = data.get_categorys()

            conexion_db.query(sql3, function(err, data, fields){
                if(err) throw err

                response.render("pages/add_product", {data ,success: [{msg: "Producto agregado con exito"}]})

            }) 
            

        })
        
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

router.get("/editar/producto/:id", function(req, res){
    let id = req.params.id

    let sql = data.get_product({id: id})
    
    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err
        
        res.json(data)

    })
    
})

router.post("/editar/producto", function(req, res){

    const {id_producto, descripcion, precio, visible} = req.body
    
    let sql = data.update_product(id_producto, descripcion, precio, visible)

    conexion_db.query(sql, function(err, data, fields){
        if(err) throw err

        res.redirect("/admin/dashboard")
    })

    
})

router.get("/mensajes", function(req, res){
    let sql = data.get_messages()

    conexion_db.query(sql, function(err, data,  fields){
        if(err) throw err

        res.render("pages/messages", {data})
    })
})


module.exports = router