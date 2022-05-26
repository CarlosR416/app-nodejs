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
                    WHERE b.visible = "S"
                    LIMIT 3`
        
        
    },
    add_product: function(descripcion, precio, imagen, visible, categoria){

        let sql = `INSERT INTO productos (
                            descripcion,
                            precio,
                            imagen, 
                            visible    
                        )
                        VALUES(
                            "${descripcion}",
                            "${precio}",
                            "${imagen}",
                            "${visible}"
                        );
                    `
                    
        

        return sql
                        
    },
    CreateRelationCategory: function(id_categoria){
        // Se utiliza despues de insertar el producto
        return `INSERT INTO categorias_productos (
                        id_producto, 
                        id_categoria
                    ) 
                    VALUES (
                        LAST_INSERT_ID(),
                        "${id_categoria}"
                );`
        
    },
    del_product: function(id){

        return `DELETE FROM productos WHERE id=${id}`
    },
    get_product: function(param){

        sql = "WHERE a.visible = 'S'"
        
        if(param.c != undefined){
            sql = `LEFT JOIN categorias_productos b 
                        ON a.id = b.id_producto
                    WHERE b.id_categoria = "${param.c}" and a.visible = 'S'
                    `
        } 
 
        (param.limit != undefined) ? sql = sql+" LIMIT "+limit : sql = sql
        
        if(param.id != undefined){
            sql = `WHERE a.id = ${param.id}`
        }

        return `SELECT
                    a.id,
                    a.descripcion,
                    a.imagen as imagen_src,
                    a.precio,
                    a.visible
                FROM
                    productos a

                ${sql}`
    },
    search_product: function(param){
        
        let sql = `WHERE a.visible = 'S' and a.descripcion LIKE "%${param.search}%"`
        
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
                    a.precio,
                    a.visible
                FROM
                    productos a
                ${sql}`
    },
    get_dashboard: function(){
        
        return `SELECT
                    a.id,
                    ROW_NUMBER() OVER(ORDER BY  id ASC) as nun,
                    a.descripcion,
                    a.precio,
                    a.visible,
                    a.imagen as imagen_src
                FROM
                    productos a`
                
    },
    get_categorys: function(){
        return `SELECT * FROM categorias`
    }, 
    update_product: function(id_producto, descripcion, precio, visible){
        return `UPDATE productos SET descripcion="${descripcion}", precio="${precio}", visible="${visible}" WHERE id="${id_producto}"`
    },
    get_messages: function(){
        return `SELECT *, ROW_NUMBER() OVER(ORDER BY  id ASC) as nun FROM contacto`
    }
    

}