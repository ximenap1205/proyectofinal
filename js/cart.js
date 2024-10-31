let products = JSON.parse(localStorage.getItem('productos')) || [];
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
            <div class="row g-2 align-items-center flex-lg-row flex-column">
            <div class="col-lg-2 col-md-3 mb-3 mb-lg-0">
                <img src="${product.images[0]}" class="img-fluid rounded-3" id="img-cart-product" onclick="goToProduct(${product.id})" alt="${product.name}">
            </div>
            <div class="col-lg-2 col-md-4">
               <h6 class="text-muted">${product.category}</h6>
                <h6 class="mb-0" id="product-name-cart" onclick="goToProduct(${product.id})">${product.name}</h6>
            </div>
            <div class="col-lg-2 text-lg-end">
                <h6 class="mb-0">${product.currency}: ${product.cost}</h6>
            </div>
            <div class="col-lg-2 align-items-center" style="flex: 1;">
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
                    <span id="subtotal-${index}"></span>
                </h6>
            </div>
                <div class="col-lg-2 text-end">
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
    let products = JSON.parse(localStorage.getItem("productos")) || [];
    products[index].quantity = Math.max(1, products[index].quantity + change);

    const quantityInput = document.getElementById(`input-quantity-${index}`);
    quantityInput.value = products[index].quantity;

    // ANTO --- const newSubtotal = 
    //document.getElementById(`subtotal-${index}`).textContent = newSubtotal; //

    localStorage.setItem("productos", JSON.stringify(products));
    updateCartSummary(products);
    updateCartCount();
}

//eliminar producto del carrito

function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem("productos")) || [];
    products.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(products));
    document.getElementById('cart-items-container').children[index].remove();

    if (products.length === 0) {
        document.getElementById('cart-items-container').innerHTML = "<p>No hay productos en el carrito.</p>";
    }

    updateCartSummary(products);
}

// actualizae carrito resumen

function updateCartSummary(products) {
    const summaryContainer = document.getElementById('cart-summary');
    let subtotalUYU = 0;
    let subtotalUSD = 0;

    //ANTO SUBTOTAL UYU SUBTOTAL USD//

    summaryContainer.innerHTML = `
        <h5>Resumen del pedido</h5>
        <hr>
        <div class="d-flex justify-content-between">
            <p>Subtotal UYU:</p>
            <p><strong>${subtotalUYU}</strong></p>
        </div>
        <div class="d-flex justify-content-between">
            <p>Subtotal USD:</p>
            <p><strong>${subtotalUSD}</strong></p>
        </div>
        <hr>
        <div class="buttons-comprar d-flex justify-content-between g-2">
            <button class="col-6 btn btn-outline-warning me-2" id="btn-seguir-comprar" onclick="location.href='categories.html'">Seguir comprando</button>
            <button class="col-6 btn btn-warning" id="btn-pagar">Ir a pagar</button>
        </div>
    `;
}

function goToProduct(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
    console.log(id);
}

//badge* con la cantidad total de productos añadidos.
function updateCartCount(){

    let cartProducts = JSON.parse(localStorage.getItem("productos")) || [];
    let cartCountElement = document.getElementById("cart-count");
    let cartCount= cartProducts.reduce((total, product)=> total + product.quantity, 0);
    
    cartCountElement.innerText = cartCount;
    if (cartCount === 0) {
       cartCountElement.style.display = "none";
    } else { 
       cartCountElement.style.display = "inline-block";
    }
    
}
