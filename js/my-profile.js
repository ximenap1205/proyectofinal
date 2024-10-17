document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = true;
  const email = sessionStorage.getItem('email');
  const campo = document.getElementById('email');

  if (!isLoggedIn) {
      window.location.href = "login.html"; 
  }

  const isFirstAccess = !sessionStorage.getItem('firstAccess');

  if (isFirstAccess) {
      document.getElementById('nombre').value = '';
      document.getElementById('segundo-nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('segundo-apellido').value = '';
      document.getElementById('telefono').value = '';
      
      sessionStorage.setItem('firstAccess', true);
  } else {
      if (email) {
          campo.value = email;
      }

      document.getElementById('nombre').value = sessionStorage.getItem('nombre') || '';
      document.getElementById('segundo-nombre').value = sessionStorage.getItem('segundoNombre') || '';
      document.getElementById('apellido').value = sessionStorage.getItem('apellido') || '';
      document.getElementById('segundo-apellido').value = sessionStorage.getItem('segundoApellido') || '';
      document.getElementById('telefono').value = sessionStorage.getItem('telefono') || '';
      const modoDiaNoche = sessionStorage.getItem('modoDiaNoche');
      if (modoDiaNoche === "noche") document.getElementById('modo-dia-noche').checked = true;
  }

  document.getElementById('guardar-btn').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;

      if (!nombre || !apellido || !email) {
          alert("Complete los campos obligatorios.");
          return;
      }

      sessionStorage.setItem('nombre', nombre);
      sessionStorage.setItem('segundoNombre', document.getElementById('segundo-nombre').value);
      sessionStorage.setItem('apellido', apellido);
      sessionStorage.setItem('segundoApellido', document.getElementById('segundo-apellido').value);
      sessionStorage.setItem('telefono', document.getElementById('telefono').value);
      sessionStorage.setItem('email', email);
  });

  // Desafiate
  const defaultFile = 'https://via.placeholder.com/150';
  const file = document.getElementById('foto');
  const img = document.getElementById('img');

  file.addEventListener('change', e => {
      if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
              img.src = e.target.result;
          }
          reader.readAsDataURL(e.target.files[0]);
      } else {
          img.src = defaultFile;
      }
  });

  sessionStorage.setItem('foto', document.getElementById('foto').value);
});
