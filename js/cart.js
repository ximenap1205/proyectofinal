const products = JSON.parse(localStorage.getItem('productos')) || [];
const productCardsContainer = document.getElementById('cart-items-container');
const summaryContainer = document.getElementById('cart-summary');

document.addEventListener("DOMContentLoaded", function () {

    // si no hay productos en el carrito
    if (products.length === 0) {
        productCardsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    //card de producto

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = "card card-cart mb-4 p-3";

        productCard.innerHTML = `
            <div class="row g-2 align-items-center flex-lg-row flex-column card-cart-body">
                <div class="col-lg-2 mb-3 mb-lg-0">
                    <img src="${product.images[0]}" class="img-fluid rounded-3" id="img-cart-product" onclick="goToProduct(${product.id})" alt="${product.name}">
                </div>
                <div class="col-lg-2 col-md-4">
                <h6 class="text-muted">${product.category}</h6>
                    <h6 class="mb-0" id="product-name-cart" onclick="goToProduct(${product.id})">${product.name}</h6>
                </div>
                <div class="col-lg-2 text-lg-end">
                    <h6 class="mb-0">${product.currency}: ${product.cost}</h6>
                </div>
                <div class="col-lg-2 align-items-center quantity-items" style="flex: 1;">
                    <div class="d-flex align-items-center">
                        <button class="btn btn-link px-1" onclick="updateQuantity(${index}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input id="input-quantity-${index}" min="1" name="quantity"
                            value="${product.quantity}" type="number"
                            class="form-control text-center input-quantity" readonly />
                        <button class="btn btn-link px-1" onclick="updateQuantity(${index}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="col-lg-2 text-lg-end">
                    <h6 class="mb-0">Subtotal: ${product.currency}
                        <span id="subtotal-${index}">${(product.cost * product.quantity).toFixed(2)}</span>
                    </h6>
                </div>
                <div class="col-lg-2 text-end btn-borrar">
                    <a href="#!" class="text-muted d-inline-block" onclick="removeProduct(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </a>
                </div>
            </div>
        `;
        productCardsContainer.appendChild(productCard);
    });

    updateCartSummary(products);
});

// actualizar carrito

function updateQuantity(index, change) {
    products[index].quantity = Math.max(1, products[index].quantity + change);

    const quantityInput = document.getElementById(`input-quantity-${index}`);
    quantityInput.value = products[index].quantity;

    const newSubtotal = (products[index].cost * products[index].quantity).toFixed(2);
    document.getElementById(`subtotal-${index}`).textContent = newSubtotal;
   
    localStorage.setItem("productos", JSON.stringify(products));

    actualizarSubtotalesProductos();
    updateCartSummary(products);
}
//LORE

//eliminar producto del carrito

function removeProduct(index) {
    // validación índice es válido
    if (index < 0 || index >= products.length) {
        console.error("Índice no válido. No se puede eliminar el producto.");
        return;
    }

    products.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(products));

    const productCard = document.getElementById('cart-items-container').children[index];
    if (productCard) {
        productCard.remove();
    }

    // si el carrito esta vacio
    if (products.length === 0) {
        document.getElementById('cart-items-container').innerHTML = "<p>No hay productos en el carrito.</p>";
    }

    actualizarSubtotalesProductos();
    updateCartSummary(products);
}

// actualizar carrito resumen

function updateCartSummary(products) {
    
    
    // subtotales
    let subtotalUYU = 0;
    let subtotalUSD = 0;

    products.forEach(product => {
        if (product.currency === 'UYU') {
            subtotalUYU += product.cost * product.quantity;
        } else if (product.currency === 'USD') {
            subtotalUSD += product.cost * product.quantity;
        }
    })

    // costo de envio

    const shippingType = document.getElementById('shippingType').value;

    console.log('Tipo de envío seleccionado:', shippingType);
    
    let porcentajeEnvio = 0;
    
    if (shippingType === 'premium') {
        porcentajeEnvio = 0.15;
    } else if (shippingType === 'express') {
        porcentajeEnvio = 0.07;
    } else if (shippingType === 'standard') {
        porcentajeEnvio = 0.05;
    }

    console.log('Porcentaje de envío:', porcentajeEnvio);

    // Calcula el costo de envio basado en el subtotal
    const costoEnvioUYU = subtotalUYU * porcentajeEnvio;
    const costoEnvioUSD = subtotalUSD * porcentajeEnvio;

    // escucha el cambio en el tipo de envio
    const shippingTypeElement = document.getElementById('shippingType');
    if (shippingTypeElement) {
        shippingTypeElement.addEventListener('change', () => {
            updateCartSummary(products);
        });
    }

    // totales
    let totalUYU = subtotalUYU + costoEnvioUYU;
    let totalUSD = subtotalUSD + costoEnvioUSD;

    // resumen

    summaryContainer.innerHTML = `
        <h5>Resumen del pedido</h5>
        <hr>
        <div class="d-flex justify-content-between">
            <p>Subtotal UYU:</p>
            <p>${subtotalUYU.toFixed(2)}</p>
        </div>
        <div class="d-flex justify-content-between">
            <p>Subtotal USD:</p>
            <p>${subtotalUSD.toFixed(2)}</p>
        </div>
        <hr>
        <div class="d-flex justify-content-between text-muted">
            <p>Costo de envío UYU:</p>
            <p>${costoEnvioUYU.toFixed(2)}</p>
        </div>
        <div class="d-flex justify-content-between text-muted">
            <p>Costo de envío USD:</p>
            <p>${costoEnvioUSD.toFixed(2)}</p>
        </div>
        <hr>
        <div class="d-flex justify-content-between">
            <p>Total UYU:</p>
            <p><strong>${totalUYU.toFixed(2)}</strong></p>
        </div>
        <div class="d-flex justify-content-between">
            <p>Total USD:</p>
            <p><strong>${totalUSD.toFixed(2)}</strong></p>
        </div>
        <hr>
        <div class="buttons-comprar d-flex justify-content-between g-2">
            <button class="col-6 btn btn-outline-warning me-2" id="btn-seguir-comprar" onclick="location.href='categories.html'">Seguir comprando</button>
            <button class="col-6 btn btn-warning" id="btn-pagar">Ir a pagar</button>
        </div>
    `;
     
    // Conexión entre el modal y el botón "ir a pagar"
    const btnPagar = document.getElementById("btn-pagar");
    btnPagar.addEventListener("click", function () {
        modal.show();
    });

    const creditCard = document.getElementById('creditCardDetails');
    const bankAccount = document.getElementById('bankTransferDetails');
    creditCard.hidden = true;
    bankAccount.hidden = true;

    // Escuchar el cambio en el menú de forma de pago
    document.getElementById('paymentMethod').addEventListener('change', modalShowItems);

}
const modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
function modalShowItems() {
    const creditCard = document.getElementById('creditCardDetails');
    const bankAccount = document.getElementById('bankTransferDetails');
    const menuPayment = document.getElementById('paymentMethod');

    creditCard.hidden = menuPayment.value !== "creditCard";
    bankAccount.hidden = menuPayment.value !== "bankTransfer";
}



const continueButton = document.getElementById('btn-continue');
const tabs = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-pane');

continueButton.addEventListener('click', function() {
  // Obtener la pestaña activa
  const activeTab = document.querySelector('.nav-link.active');
  
  // Buscar la siguiente pestaña
  let nextTab = activeTab.parentElement.nextElementSibling?.querySelector('.nav-link');
  
  if (nextTab) {
    // Cambiar a la siguiente pestaña
    activeTab.classList.remove('active');
    nextTab.classList.add('active');

    // Cambiar el contenido visible
    const targetId = nextTab.getAttribute('href').substring(1);
    const targetPane = document.getElementById(targetId);
    
    tabContents.forEach(pane => pane.classList.remove('show', 'active'));
    targetPane.classList.add('show', 'active');
 

 if (!nextTab.parentElement.nextElementSibling) {
    continueButton.textContent = "Finalizar compra";
} else {
    continueButton.textContent = "Continuar";
}
} else {

if (validateFields()) {
    showSuccessMessage();
} else {
    showErrorMessage();
}
}
});




//validar campos  
function validateFields(){  
    let direccionValidada = validateDireccion();  
    let envioValidado = validateEnvio();  
    let pagoValidado = validatePago();  
    let cantidadesValidas = validateCantidades();  

    return direccionValidada && envioValidado && pagoValidado && cantidadesValidas;  
}  

//Validar direccion  
function validateDireccion(){  
const department = document.getElementById('department').value.trim();  
    const locality = document.getElementById('locality').value.trim();  
    const street = document.getElementById('street').value.trim();  
    const number = document.getElementById('number').value.trim();  
    const corner = document.getElementById('corner').value.trim();  

    return department !== "" && locality !== "" && street !== "" && number !== "" && corner !== "";  
}  

//validar tipo de envio  
function validateEnvio() {  
    const tipodeEnvio = document.getElementById('shippingType').value;  
    return tipodeEnvio !== "";  
}  

//validar tipo de pago  
function validatePago() {
const tipoDePago = document.getElementById('paymentMethod').value;
if (tipoDePago === "") return false;

// Validación según tipo de pago
if (tipoDePago === 'creditCard') {
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cardExpiry = document.getElementById('cardExpiry').value.trim();
    const cardCVV = document.getElementById('cardCVV').value.trim();
    return cardNumber !== "" && cardExpiry !== "" && cardCVV !== "";
}

const bankAccount = document.getElementById('bankAccount').value.trim();
const bankDetails = document.getElementById('bankDetails').value.trim();
return bankAccount !== "" && bankDetails !== "";
}

//Validamos cantidad de productos > 0  
function validateCantidades() {  
    const productsInCart = JSON.parse(localStorage.getItem('productos')) || [];  
    return productsInCart.every(product => product.quantity > 0);  
}  

//Si la compra se realiza  
function showSuccessMessage() {  
    modal.hide();
    localStorage.removeItem('productos');  // Limpiamos el carrito de compras  
    actualizarBadge();
    productCardsContainer.innerHTML = '';
    summaryContainer.remove();
    productCardsContainer.classList.remove("col-lg-8");
    productCardsContainer.classList.add("col");
    productCardsContainer.innerHTML = `
    <p>¡Compra exitosa! Recibirás un correo de confirmación en los próximos segundos...</p>
    <p id="compra-agradecimiento" class= "text-end">Muchas gracias por comprar en eMercado</p>
     `;   

}  


//Si los campos no estan completos  
function showErrorMessage() {  
    alert('Por favor, complete todos los campos antes de finalizar la compra.');  
} 

// Agregar un event listener a cada pestaña para detectar si se vuelve a una anterior
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const isLastTab = !tab.parentElement.nextElementSibling;
    continueButton.textContent = isLastTab ? "Finalizar compra" : "Continuar";
  });
});


let unidades = 0;
let precio = 0;

function actualizarSubtotalesProductos() {

    if (products.length > 0) {
        products.forEach(producto => {
            unidades += producto.quantity;
            precio += producto.cost * producto.quantity;
        });
    }

    const unidadesElement = document.getElementById("unidades");
    const precioElement = document.getElementById("precio");
    

    if (unidadesElement && precioElement) {
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio.toFixed(2);///redondeará el número en función de la cantidad de decimales que especifiques algo nuevo que aprendi jaja
    }
    actualizarBadge();
   
}

    // Actualiza el badge del carrito
    function actualizarBadge(){
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        cartCountElement.innerText = unidades;
        if (unidades === 0) {
            cartCountElement.style.display = "none";
        } else { 
            cartCountElement.style.display = "inline-block";
        }
    }
}
function goToProduct(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
    console.log(id);
}