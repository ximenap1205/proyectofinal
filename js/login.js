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