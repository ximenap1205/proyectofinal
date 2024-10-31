const products = JSON.parse(localStorage.getItem('productos')) || [];
const productCardsContainer = document.getElementById('cart-items-container');

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

    actualizarTotales();
    updateCartSummary(products);
}

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

    actualizarTotales();
}

// actualizar carrito resumen

function updateCartSummary(products) {
    const summaryContainer = document.getElementById('cart-summary');
    let subtotalUYU = 0;
    let subtotalUSD = 0;

    products.forEach(product => {
        if (product.currency === 'UYU') {
            subtotalUYU += product.cost * product.quantity;
        } else if (product.currency === 'USD') {
            subtotalUSD += product.cost * product.quantity;
        }
    })

    summaryContainer.innerHTML = `
        <h5>Resumen del pedido</h5>
        <hr>
        <div class="d-flex justify-content-between">
            <p>Subtotal UYU:</p>
            <p><strong>${subtotalUYU.toFixed(2)}</strong></p>
        </div>
        <div class="d-flex justify-content-between">
            <p>Subtotal USD:</p>
            <p><strong>${subtotalUSD.toFixed(2)}</strong></p>
        </div>
        <hr>
        <div class="buttons-comprar d-flex justify-content-between g-2">
            <button class="col-6 btn btn-outline-warning me-2" id="btn-seguir-comprar" onclick="location.href='categories.html'">Seguir comprando</button>
            <button class="col-6 btn btn-warning" id="btn-pagar">Ir a pagar</button>
        </div>
    `;
}

function actualizarTotales() {

    let unidades = 0;
    let precio = 0;

    if (products.length > 0) {
        products.forEach(producto => {
            unidades += producto.quantity;
            precio += producto.cost * producto.quantity;
        });
    }

    const unidadesElement = document.getElementById("unidades");
    const precioElement = document.getElementById("precio");
    const cartCountElement = document.getElementById("cart-count");

    if (unidadesElement && precioElement) {
        unidadesElement.innerText = unidades;
        precioElement.innerText = precio.toFixed(2);///redondeará el número en función de la cantidad de decimales que especifiques algo nuevo que aprendi jaja
    }

    // Actualiza el badge del carrito
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