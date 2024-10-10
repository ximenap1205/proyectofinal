document.addEventListener('DOMContentLoaded', () => {

    const isLoggedIn = true; 
    const email = localStorage.getItem('email');
    const campo = document.getElementById('email');

    if (email) { campo.value = email; };
  
    if (!isLoggedIn) {
      window.location.href = "login.html"; 
    }
});

const nombre = localStorage.getItem('nombre');
  const segundoNombre = localStorage.getItem('segundoNombre');
  const apellido = localStorage.getItem('apellido');
  const segundoApellido = localStorage.getItem('segundoApellido');
  const telefono = localStorage.getItem('telefono');
  const modoDiaNoche = localStorage.getItem('modoDiaNoche');

  if (nombre) document.getElementById('nombre').value = nombre;
  if (segundoNombre) document.getElementById('segundo-nombre').value = segundoNombre;
  if (apellido) document.getElementById('apellido').value = apellido;
  if (segundoApellido) document.getElementById('segundo-apellido').value = segundoApellido;
  if (telefono) document.getElementById('telefono').value = telefono;
  if (modoDiaNoche === "noche") document.getElementById('modo-dia-noche').checked = true;

  document.getElementById('guardar-btn').addEventListener('click', () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;

    if (!nombre || !apellido || !email) {
      alert("Complete los campos obligatorios.");
      return;
    }
  });

  // Guarda en localStorage
  localStorage.setItem('nombre', nombre);
  localStorage.setItem('segundoNombre', document.getElementById('segundo-nombre').value);
  localStorage.setItem('apellido', apellido);
  localStorage.setItem('segundoApellido', document.getElementById('segundo-apellido').value);
  localStorage.setItem('telefono', document.getElementById('telefono').value);