document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const contraInput = document.getElementById('contra');
    const loginForm = document.getElementById('loginForm');

    // Validar en tiempo real
    emailInput.addEventListener('input', () => validateEmail(emailInput));
    contraInput.addEventListener('input', () => validateField(contraInput));

    // Manejo del envío del formulario
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el envío por defecto

        // Validaciones
        const emailValid = validateEmail(emailInput);
        const passwordValid = validateField(contraInput);

        if (!emailValid || !passwordValid) {
            alert('Por favor, verifica los campos antes de continuar.');
            return; // Detener el proceso si las validaciones fallan
        }

        try {
            // Enviar solicitud al servidor
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: emailInput.value,
                    password: contraInput.value
                })
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas.');
            }

            const data = await response.json();
            console.log(data); // Procesar la información de la respuesta

            // Guardar datos en localStorage y redirigir
            localStorage.setItem('email', emailInput.value);
            location.replace('index.html');
        } catch (error) {
            console.error(error);
            alert('Error al iniciar sesión: ' + error.message);
        }
    });

    // Función para validar email
    function validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar email
        if (emailRegex.test(input.value.trim())) {
            input.classList.remove('error');
            input.classList.add('valid');
            return true;
        } else {
            input.classList.remove('valid');
            input.classList.add('error');
            return false;
        }
    }

    // Función para validar campos vacíos
    function validateField(input) {
        if (input.value.trim() !== "") {
            input.classList.remove('error');
            input.classList.add('valid');
            return true;
        } else {
            input.classList.remove('valid');
            input.classList.add('error');
            return false;
        }
    }
});
