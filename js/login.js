document.getElementById('boton').addEventListener('click', function(event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let contra = document.getElementById('contra').value;

    if (email && contra) {
        localStorage.setItem('email', email);
        location.replace('index.html');
    } else {
        alert('Please fill in the fields.');
    }
});

