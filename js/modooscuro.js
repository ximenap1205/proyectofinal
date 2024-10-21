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
 //Visibilidad del nombre de usuario

 let userName = localStorage.getItem('email');
 if (userName) {

     let userContainer = document.getElementById("user")

     userContainer.innerHTML = `
     
     <a  id= "user-container" class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
   <ul class="dropdown-menu">
     <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
     <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
     <li><hr class="dropdown-divider"></li>
     <li><a  id="logout-btn" class="dropdown-item" href="#">Cerrar Sesión </a></li>
   </ul>
     `;

     document.getElementById("user-container").textContent = userName;
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

