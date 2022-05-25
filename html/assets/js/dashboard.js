var myModal = new bootstrap.Modal(document.getElementById('confirm-delete'), {keyboard: false})

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