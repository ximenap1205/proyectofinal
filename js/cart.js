document.addEventListener("DOMContentLoaded", function() {

    let products = JSON.parse(localStorage.getItem("productos")) || [];
    const productCardsContainer = document.getElementById('cart-items-container');

    if (products.length === 0) {
        productCardsContainer.innerHTML = "<p>No hay productos en el carrito.</p>";
        return;
    }

    for (let i = 0; i < products.length; i++) {

        let product = products[i];
        const productCard = document.createElement('div');
        productCard.className = "row mb-4 d-flex justify-content-between align-items-center";

        productCard.innerHTML = `
            <div class="col-md-2 col-lg-2 col-xl-2">
                <img src="${product.images[0]}" class="img-fluid rounded-3" alt="${product.name}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <h6 class="text-muted">${product.category}</h6>
                <h6 class="mb-0">${product.name}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                    <i class="fas fa-minus"></i>
                </button>
                <input min="1" name="quantity" value="${product.quantity}" type="number" class="form-control form-control-sm" />
                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-link px-2" onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h6 class="mb-0">${product.currency}: ${product.cost}</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
            </div>
        `;

        productCardsContainer.appendChild(productCard);
    };

});