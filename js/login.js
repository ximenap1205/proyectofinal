document.addEventListener('DOMContentLoaded', function () {

    const emailInput = document.getElementById('email');
    const contraInput = document.getElementById('contra');
    const loginForm = document.getElementById('loginForm');

    emailInput.addEventListener('input', () => validateEmail(emailInput));
    contraInput.addEventListener('input', () => validateField(contraInput));

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // evita el envio por defecto

        const emailValid = validateEmail(emailInput);
        const passwordValid = validateField(contraInput);

        if (emailValid && passwordValid) {
            localStorage.setItem('email', emailInput.value);
            location.replace('index.html');
        }
    });

})

function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // expresion regular para validar email
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