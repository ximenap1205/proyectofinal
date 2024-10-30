document.addEventListener("DOMContentLoaded", function () {
    let products = JSON.parse(localStorage.getItem('productos')) || [];
    const productCardsContainer = document.getElementById('cart-items-container');

    if (products.length === 0) {
        productCardsContainer.innerHTML = `
            <tr>
                <td colspan="5" class="text-center">No hay productos en el carrito.</td>
            </tr>`;
        return;
    }

    products.forEach((product, index) => {
        const productRow = document.createElement('tr');

        productRow.innerHTML = `
            <td class="col-2 text-center align-middle p-4">
                <div class="h-100 d-flex justify-content-center align-items-center">
                    <img src="${product.images[0]}" class="img-fluid rounded-3" style="max-height: 10rem; width: auto;" alt="${product.name}" />
                </div>
            </td>
            <td class="col-4 text-start align-middle p-4">
                <h6 class="text-muted">${product.category}</h6>
                <h6 class="mb-0">${product.name}</h6>
            </td>
            <td class="col-3 text-center align-middle p-4">${product.currency}: ${product.cost}</td>
            <td class="col-2 text-center align-middle p-4">
                <div class="d-flex align-items-center justify-content-center h-2">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <input id="input-quantity-${index}" min="1" name="quantity" value="${product.quantity}"
                        type="number" class="mx-2 text-center input-quantity" readonly />
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </td>
            <td class="col-1 text-center align-middle p-4">
                <a href="#!" class="text-muted" onclick="removeProduct(${index})">
                    <i class="fas fa-times"></i>
                </a>
            </td>
        `;

        productCardsContainer.appendChild(productRow);
    });

    updateCartSummary(products);
});

// Función para actualizar la cantidad sin recargar la página
function updateQuantity(index, change) {
    let products = JSON.parse(localStorage.getItem("productos")) || [];

    products[index].quantity = Math.max(1, products[index].quantity + change);

    document.getElementById(`input-quantity-${index}`).value = products[index].quantity;
    localStorage.setItem("productos", JSON.stringify(products));

    updateCartSummary(products);
}

// Función para eliminar un producto del carrito
function removeProduct(index) {
    let products = JSON.parse(localStorage.getItem("productos")) || [];

    products.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(products));

    // Elimina la fila del producto sin refrescar la página
    document.querySelector(`#cart-items-container tr:nth-child(${index + 1})`).remove();

    updateCartSummary(products);
}

// Función para actualizar el resumen del carrito
function updateCartSummary(products) {
    const summaryContainer = document.getElementById('cart-summary');
    const total = products.reduce((acc, product) => acc + product.cost * product.quantity, 0);

    summaryContainer.innerHTML = `
        <h5>Resumen del pedido</h5>
        <hr>
        <div class="d-flex justify-content-between">
            <p>Total:</p>
            <p><strong>${total.toFixed(2)}</strong></p>
        </div>
        <button class="btn btn-primary btn-block">Ir a Pagar</button>
    `;
}