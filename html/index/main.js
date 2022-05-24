var socket = io();

var myModal = new bootstrap.Modal(document.getElementById('confirm-delete'), {keyboard: false})

/*socket.on("mensaje", function (mensaje) {

    document.getElementById("mensaje").innerHTML = mensaje.mensaje
    console.log(mensaje.mensaje);

})



document.getElementById("div-dashboard").innerHTML = `
    <table class="table">
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
                </table>`*/



document.getElementById("productos-a").addEventListener("click", function(event){


    socket.emit("getdata", {id: "1616"})

    

})

socket.on("carga-productos", function (datos) {

    document.getElementById("div-dashboard").innerHTML = datos
})

let eliminar_registro = document.getElementsByClassName("eliminar-registro")

for(var i = 0; i < eliminar_registro.length; i++ )
{
    eliminar_registro[i].addEventListener("click", function(e){
        e.preventDefault()
        document.getElementById("btn-delete-ok").dataset.delete_id = this.dataset.delete_id
        myModal.show()
    })
}



document.getElementById("btn-delete-ok").addEventListener("click", function(){
    
    let id = document.getElementById("btn-delete-ok").dataset.delete_id 
    let url = "/admin/delete/producto/"+id
    
    fetch(url, {method: 'POST'})
    .then(response => response.json())
    .then(repos => { 
    	
        myModal.hide()
        if(repos.delete){
            document.getElementById("producto-"+id).remove()
        }else{
            alert("Ocurrio un problema, no se pudo eliminar")
        }
         
    })
    .catch(err => console.log(err))
})



