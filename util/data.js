module.exports = {
    
    productos_inicio: function(){
        
        return `SELECT
                        b.id,
                        b.descripcion,
                        b.imagen as imagen_src,
                        b.precio
                    FROM
                        productos_inicio a
                    JOIN productos b ON
                        a.id_producto = b.id
                    LIMIT 3`
        
        
    },
    add_product: function(descripcion, precio, imagen){

        return `INSERT INTO productos (
                            descripcion,
                            precio,
                            imagen    
                        )
                        VALUES(
                            "${descripcion}",
                            "${precio}",
                            "${imagen}"
                        )`
                        
    },
    del_product: function(id){

        return `DELETE FROM productos WHERE id=${id}`
    },
    get_product: function(param){

        sql = "WHERE a.visible = 'S'"
        
        if(param.c != undefined){
            sql = `JOIN categorias_productos b 
                        ON a.id = b.id_producto
                    WHERE b.id_categoria = "${param.c}" and a.visible = 'S'
                    `
        } 
 
        (param.limit != undefined) ? sql = sql+" LIMIT "+limit : sql = sql
        
        return `SELECT
                    a.id,
                    a.descripcion,
                    a.imagen as imagen_src,
                    a.precio
                FROM
                    productos a

                ${sql}`
    },
    search_product: function(param){
        
        let sql = `JOIN categorias_productos b 
                        ON a.id = b.id_producto
                    WHERE a.visible = 'S' and a.descripcion LIKE "%${param.search}%"
                    `
        
        if(param.c != undefined){
            sql = `JOIN categorias_productos b 
                        ON a.id = b.id_producto
                    WHERE b.id_categoria = "${param.c}" and a.visible = 'S' and a.descripcion LIKE "%${param.search}%"
                    `
        }
        
        return `SELECT
                    a.id,
                    a.descripcion,
                    a.imagen as imagen_src,
                    a.precio
                FROM
                    productos a
                ${sql}`
    }
    

}