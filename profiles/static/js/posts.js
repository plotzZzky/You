function previewImage() {
    var output = document.getElementById('imgPreview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
                          URL.revokeObjectURL(output.src)
                          }
}


function showModal(id) {
    let modal = $('#viewModal');
    if ( modal.is('visible')) {
        closeModal()
    } else {
     modal.show();
     set(id)
     $('#sideBar').hide();
    }
}


function closeModal() {
    let modal = $('#viewModal');
    modal.hide();
    $('#sideBar').show();
}


$(document).ready(function(){
    $("#viewModal").click(function(){
        closeModal()
    });
   $("#viewModal *").click(function(e) {
        e.stopPropagation();
   });
});


function set(id) {
    $.get('http://127.0.0.1:8000/profiles/modal/id=' + id + '/', function(result){
        $("#viewModal").html(result);
    });
}
