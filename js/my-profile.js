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

  //Desafiate
  const defaultFile = 'https://via.placeholder.com/150';
  const file = document.getElementById('foto');
  const img = document.getElementById('img');
  file.addEventListener('change', e => {
    if (e.target.files[0]){
      const reader = new FileReader();
     reader.onload= function (e){
      img.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0])
  }else {
      img.src = defaultFile
    }
    
  });
  localStorage.setItem('foto', document.getElementById('foto').value);

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
