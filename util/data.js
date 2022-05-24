module.exports = {
    
    productos_inicio: function(){
        
        let sql =   `SELECT
                        b.id,
                        b.descripcion,
                        b.imagen as imagen_src,
                        b.precio
                    FROM
                        productos_inicio a
                    JOIN productos b ON
                        a.id_producto = b.id
                    LIMIT 3`
        
        return sql 
    },
    

}