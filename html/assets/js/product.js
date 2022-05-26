var socket = io();
var c = 1
const urlSearchParams = new URLSearchParams(window.location.search);
const categoria = urlSearchParams.get("c");

(categoria != null)? c = categoria : c = undefined ;

var Modal_ver_producto = new bootstrap.Modal(document.getElementById('view-product'), {keyboard: false})

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
                      <a href="#" class="btn btn-primary" name="more-info" data-id="${element.id}"> Mas Información</a>
                  </div>
                </div>`
  
    });
  }
 
  document.getElementById('div-content').innerHTML = html 

  more_info()
  
})

socket.on("listar_producto", function(data){
  
  console.log(data)
  if(data.datos.length != 0){

    var html = `<div class="col-lg-12 custom-border">
                  <div class="post-entry-1">
                      <a href="single-post.html"><img src="/assets/img${data.datos[0].imagen_src}" alt="" class="img-fluid" ></a>
                      <div class="post-meta"><span class="date">Ref: ${data.datos[0].precio}</span> </div>
                      <h2><a href="single-post.html">${data.datos[0].descripcion}</a></h2>
                  </div>
                </div>`

    document.getElementById("modal-body-content").innerHTML = html 

  }else{
    document.getElementById("modal-body-content").innerHTML = ' <div class="text-center my-8"><h3 href="/productos" class="">Sin resultados</h3></div>' 
  }
  
  Modal_ver_producto.show()


  console.log(data)
})

document.getElementById("form-search").addEventListener("submit", function(e){
  
  e.preventDefault()
 
  socket.emit("buscar_producto", {search: this.s.value, c})

})

function more_info(){
  var boton = document.getElementsByName("more-info")

  for (let i = 0; i < boton.length; i++) {

    boton[i].addEventListener("click", function(e){
      
      e.preventDefault()
      socket.emit("ver_producto", {id: this.dataset.id})
    
    })
    
  }
}

more_info()






