document.addEventListener('DOMContentLoaded', () => {
  const email = localStorage.getItem('email');
  const campo = document.getElementById('email');

  const isFirstAccess = !localStorage.getItem('firstAccess');

  if (isFirstAccess) {
      document.getElementById('nombre').value = '';
      document.getElementById('segundo-nombre').value = '';
      document.getElementById('apellido').value = '';
      document.getElementById('segundo-apellido').value = '';
      document.getElementById('telefono').value = '';
      
      localStorage.setItem('firstAccess', true);
  } else {
      if (email) {
          campo.value = email;
      }

      document.getElementById('nombre').value = localStorage.getItem('nombre') || '';
      document.getElementById('segundo-nombre').value = localStorage.getItem('segundoNombre') || '';
      document.getElementById('apellido').value = localStorage.getItem('apellido') || '';
      document.getElementById('segundo-apellido').value = localStorage.getItem('segundoApellido') || '';
      document.getElementById('telefono').value = localStorage.getItem('telefono') || '';
      const modoDiaNoche = localStorage.getItem('modoDiaNoche');
      if (modoDiaNoche === "noche") document.getElementById('modo-dia-noche').checked = true;
  }

  document.getElementById('guardar-btn').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;

      if (!nombre || !apellido || !email) {
          alert("Complete los campos obligatorios.");
          return;
      }

      localStorage.setItem('nombre', nombre);
      localStorage.setItem('segundoNombre', document.getElementById('segundo-nombre').value);
      localStorage.setItem('apellido', apellido);
      localStorage.setItem('segundoApellido', document.getElementById('segundo-apellido').value);
      localStorage.setItem('telefono', document.getElementById('telefono').value);
      localStorage.setItem('email', email);
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

  localStorage.setItem('foto', document.getElementById('foto').value);
});
