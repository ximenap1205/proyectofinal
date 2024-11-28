const CATEGORIES_URL = "https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/cat"; 
const PUBLISH_PRODUCT_URL = "https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/publish_products"; 
const PRODUCTS_URL = "https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/products/"; 
const PRODUCT_INFO_URL = "https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/product_info/"; 
const PRODUCT_INFO_COMMENTS_URL = "https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/products_comments/"; 
const CART_INFO_URL = "https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/user_cart"; 
const CART_BUY_URL = "https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/cart"; 
const EXT_TYPE = "https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/ext_type"; 

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    
    const token = localStorage.getItem('access-token');  // Obtener el token desde localStorage

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Incluir el token en los encabezados de la solicitud
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw Error(response.statusText);
        }
    })
    .then(function(response) {
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


// Productos dinámicos (actualizado a usar la URL de ngrok)
let getProductData = function(productId) {
    const token = localStorage.getItem('access-token');  // Obtener el token desde localStorage

    return fetch(`https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/products/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Incluir el token en los encabezados de la solicitud
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw Error("Producto no encontrado");
        }
    })
    .then(data => {
        console.log(data);  // Aquí puedes procesar la información del producto
    })
    .catch(error => {
        console.error(error);
    });
};

// Comentarios dinámicos (actualizado a usar la URL de ngrok)
let getCommentsData = function(productId) {
    const token = localStorage.getItem('access-token');  // Obtener el token desde localStorage

    return fetch(`https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/products_comments/${productId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Incluir el token en los encabezados de la solicitud
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw Error("Comentarios no encontrados");
        }
    })
    .then(data => {
        console.log(data);  // Aquí puedes procesar la información de los comentarios
    })
    .catch(error => {
        console.error(error);
    });
};
// Ejemplo en el login (cuando el servidor devuelve el token)
fetch('https://b77b-2800-a4-1afa-cd00-cd59-eb07-6277-1d11.ngrok-free.app/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'admin', password: '1234' })
})
.then(response => response.json())
.then(data => {
    if (data.token) {
        // Guardar el token en localStorage
        localStorage.setItem('access-token', data.token);
    }
})
.catch(error => console.error('Error en el login:', error));
