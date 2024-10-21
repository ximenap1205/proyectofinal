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
    if (email) {
      campo.value = email;
    }
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
   
    document.getElementById('guardar-btn').addEventListener('click', () => {
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
  
      if (!nombre || !apellido || !email) {
        alert("Complete los campos obligatorios.");
        return;
      } else {
        alert('Cambios guardados');
      }
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('segundoNombre', document.getElementById('segundo-nombre').value);
      localStorage.setItem('apellido', apellido);
      localStorage.setItem('segundoApellido', document.getElementById('segundo-apellido').value);
      localStorage.setItem('telefono', document.getElementById('telefono').value);
      localStorage.setItem('email', email);
        
    });
    
  };

  // Desafiate
  const file = document.getElementById('foto');
  // Recupera la foto de localStorage
  const savedImage = localStorage.getItem('foto');
  const img = document.getElementById('img');
  const defaultFile = "../img/img_perfil.png";
  img.src = savedImage ? savedImage : defaultFile;

  //cambiar imagen

  file.addEventListener('change', e => {
    const file = e.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            const imageData = e.target.result;
            img.src = imageData;
            localStorage.setItem('foto', imageData);
          }
          reader.readAsDataURL(file);
      } else {
          img.src = defaultFile;
          localStorage.removeItem('foto');
      }
  })
})