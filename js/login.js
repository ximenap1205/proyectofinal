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
            alert('Por favor, completa los campos.');
            return; 
        }

        try {
            // Enviar solicitud al servidor
            const response = await fetch("http://localhost:3000/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    password: contraInput.value
                })
            });
            
            console.log(response)
            if (!response.ok) {
                throw new Error('Login fallido');
            }

            const data = await response.json();

            console.log(data)
            // Guardar el token en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('email', emailInput.value);
            console.log('Token guardado:', data.token);

            // Redirigir a otra página
            location.replace('index.html');
        } catch (error) {
            console.error('Error en el login:', error);
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
