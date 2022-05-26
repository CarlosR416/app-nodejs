var myModal = new bootstrap.Modal(document.getElementById('confirm-delete'), {keyboard: false})
var ModalEdit = new bootstrap.Modal(document.getElementById('edit-product'), {keyboard: false})

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


var editar = document.getElementsByClassName("editar-registro")

for (let i = 0; i < editar.length; i++) {
    editar[i].addEventListener("click", function(e){
        e.preventDefault()

        let id = this.dataset.id 
        let url = "/admin/editar/producto/"+id

        fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(repos => { 
            document.getElementById("id_producto").value = repos[0].id
            document.getElementById('descripcion').value = repos[0].descripcion
            document.getElementById('precio').value = repos[0].precio
            console.log(repos)
            if(repos[0].visible == "S"){
                document.getElementById('visible').selectedIndex = 1
            }else{
                document.getElementById('visible').selectedIndex = 0

            }
            

            ModalEdit.show()

            
        })
        .catch(err => console.log(err))

    }) 
}


document.getElementById("btn-update-ok").addEventListener("click", function(e){
    e.preventDefault()

    document.getElementById("form_editar").submit()


})