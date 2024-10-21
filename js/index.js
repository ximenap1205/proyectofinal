document.addEventListener("DOMContentLoaded", function() {
    // Manejo de categorías
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html";
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html";
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html";
    });

    // Visibilidad del nombre de usuario

    let userName = localStorage.getItem('email');
    let userContainer = document.getElementById("user");

    if (userName) {
        userContainer.innerHTML = `
            <a id="user-container" class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a id="logout-btn" class="dropdown-item" href="#">Cerrar Sesión</a></li>
            </ul>
        `;
        document.getElementById("user-container").textContent = userName;
      
        document.getElementById('register-link').style.display = 'none';
    } else {
        userContainer.innerHTML = '';
    }

    //Funcionalidad para el boton de cerrar sesion.

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            event.preventDefault();

            localStorage.removeItem('email'); 
            localStorage.removeItem('nombre');
            localStorage.removeItem('segundoNombre');
            localStorage.removeItem('apellido');
            localStorage.removeItem('segundoApellido');
            localStorage.removeItem('telefono');
            localStorage.removeItem('foto')

            document.getElementById("user").innerHTML = '';
          
            location.replace('index.html');
        });
    }
});

