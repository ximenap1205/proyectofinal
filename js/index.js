document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//Visibilidad del nombre de usuario
document.addEventListener("DOMContentLoaded", function () {
    let userName = sessionStorage.getItem('email');
    if (userName) {
        document.getElementById("user-container").textContent = userName;
    }
});

//Funcionalidad para el boton de cerrar sesion.
document.getElementById('logout-btn').addEventListener('click', function(event) {
    event.preventDefault();

    sessionStorage.removeItem('email'); 
    localStorage.removeItem('nombre');
    localStorage.removeItem('segundoNombre');
    localStorage.removeItem('apellido');
    localStorage.removeItem('segundoApellido');
    localStorage.removeItem('telefono');
    localStorage.removeItem('modoDiaNoche');
});

    location.replace('login.html');
    