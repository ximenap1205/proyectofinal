document.addEventListener("DOMContentLoaded", function () {
    
    let toggle = document.getElementById('Toggle');
    let label_toggle = document.getElementById('label_toggle');

    function actualizarModoOscuro(activado) {
        if (activado) {
            document.body.classList.add('dark');
            label_toggle.innerHTML = '<i class="fa-regular fa-sun"></i>';
            toggle.checked = true;
        } else {
            document.body.classList.remove('dark');
            label_toggle.innerHTML = '<i class="fa-regular fa-moon"></i>';
            toggle.checked = false;
        }
    }

    let modoOscuroActivado = localStorage.getItem('modoOscuro') === 'true';
    actualizarModoOscuro(modoOscuroActivado);

    toggle.addEventListener('change', (event) => {
        let checked = event.target.checked;
        actualizarModoOscuro(checked);

        localStorage.setItem('modoOscuro', checked);
    });

    // Visibilidad del nombre de usuario

    let userName = localStorage.getItem('email');
    let userContainer = document.getElementById("user");
    let registerLink = document.getElementById('register-link');

    if (userName) {
        userContainer.innerHTML = `
            <a id="user-container" class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item d-flex align-items-center" href="cart.html">Mi carrito<span id="cart-count" class="badge rounded-pill bg-danger ms-1 mb-2">
                   0
                 <span class="visually-hidden">unread messages</span>
                  </span></a>
                </li>
                <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a id="logout-btn" class="dropdown-item" href="#">Cerrar Sesión</a></li>
            </ul>
        `;
        

        document.getElementById("user-container").textContent = userName;
    
        if (registerLink) registerLink.remove();

        //badge* con la cantidad total de productos añadidos.
        
        let cartProducts = JSON.parse(localStorage.getItem("productos")) || [];
        let cartCountElement = document.getElementById("cart-count");
        let cartCount= cartProducts.reduce((total, product)=> total + product.quantity, 0);
        
        cartCountElement.innerText = cartCount;
        if (cartCount === 0) {
            cartCountElement.style.display = "none";
        } else { 
            cartCountElement.style.display = "inline-block";
        }
    } else {

        if (userContainer) {
            userContainer.remove();
        }
        // Verifica si el enlace de "Registrarse" no existe y agregarlo
        if (!registerLink) {
            const newRegisterLink = document.createElement('li');
            newRegisterLink.classList.add('nav-item');
            newRegisterLink.id = 'register-link';
            newRegisterLink.innerHTML = `<a class="nav-link" href="login.html">Registrarse</a>`;
            document.querySelector('.navbar-nav').insertBefore(newRegisterLink, userContainer);
        }
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
        
            location.replace('login.html');
        });
    }
})