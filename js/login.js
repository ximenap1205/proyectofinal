document.getElementById('boton').addEventListener('click', function(event) {
    event.preventDefault();

    let user = document.getElementById('user').value;
    let contra = document.getElementById('contra').value;

    if (user && contra) {
        location.replace("http://127.0.0.1:5500/workspace-inicial/index.html");
    } else {
        alert('Please fill in the fields.');
    }
});