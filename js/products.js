let catID = localStorage.getItem("catID");

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

const PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

let container = document.getElementById('container-products');

getJSONData(PRODUCTS).then(function(res){
    let productos = res.data.products;

    container.innerHTML = '';

    productos.forEach((producto) => {
        let card = document.createElement('div');
        card.classList.add('card-product');
        card.setAttribute('data-id', producto.id);

        card.innerHTML = `
            <img src="${producto.image}" class="img-card" alt="${producto.name}">
            <div class="card-body-product">
                <h5 class="card-title-product">${producto.name}</h5>
                <p class="card-text-product">${producto.description}</p>
                <h5 class="price-product">USD: ${producto.cost}</h5>
                <small class="text-muted">Cantidad vendidos: ${producto.soldCount}</small>
            </div>
        `;

        card.addEventListener('click', function() {
            let productID = card.getAttribute('data-id');
            console.log(productID);
            setProductID(productID);
        });

        container.appendChild(card);
    });
})

.catch(function(error){
    console.error(error)
})
