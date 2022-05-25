var socket = io();
var c = 1
socket.on("listar_product", function (datos) {

  console.log(datos);
  
  let html = ''

  if(datos.datos.length == 0){
    html = ' <div class="text-center my-8"><h3 href="/productos" class="">Sin resultados</h3></div>'
  }else{

    datos.datos.forEach(element => {

      html +=  `<div class="col-lg-4 custom-border">
                  <div class="post-entry-1">
                      <a href="single-post.html"><img src="/assets/img${element.imagen_src}" alt="" class="img-fluid" ></a>
                      <div class="post-meta"><span class="date">Ref: ${element.precio}</span> </div>
                      <h2><a href="single-post.html">${element.descripcion}</a></h2>
                      <a href="#" class="btn btn-primary"> Mas Información</a>
                  </div>
                </div>`
  
    });
  }
 
  document.getElementById('div-content').innerHTML = html 
  
})


document.getElementById("form-search").addEventListener("submit", function(e){
  
  e.preventDefault()
 
  socket.emit("buscar_producto", {search: this.s.value, c})

})
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



/*document.getElementById("productos-a").addEventListener("click", function(event){


    socket.emit("getdata", {id: "1616"})

    

})*/

socket.on("carga-productos", function (datos) {

    document.getElementById("div-dashboard").innerHTML = datos
})





