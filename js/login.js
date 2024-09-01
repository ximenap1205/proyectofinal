document.getElementById('boton').addEventListener('click', function(event) {
    event.preventDefault();

    let user = document.getElementById('user').value;
    let contra = document.getElementById('contra').value;

    if (user && contra) {
        localStorage.setItem('user', user);
        location.replace('index.html');
    } else {
        alert('Please fill in the fields.');
    }
});
