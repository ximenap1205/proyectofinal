document.addEventListener("DOMContentLoaded", function () {
    let containerInfo = document.getElementById('container-product-info');

    let productID = localStorage.getItem("productID");
    console.log("Product ID desde localStorage:", productID);

    const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    console.log("URL del producto:", PRODUCT_INFO_URL);

    getJSONData(PRODUCT_INFO_URL).then(function (res) {
        console.log("Datos recibidos:", res);

        let productInfo = res.data;

        containerInfo.innerHTML = `
            <div class="card-product-info">
                <img src="${productInfo.images[0]}" class="img-card" alt="${productInfo.name}">
                <div class="card-body-product-info">
                    <h5 class="card-title-product-info">${productInfo.name}</h5>
                    <p class="card-text-product-info">${productInfo.description}</p>
                    <h5 class="price-product-info">USD: ${productInfo.cost}</h5>
                    <small class="text-muted">Cantidad vendidos: ${productInfo.soldCount}</small>
                </div>
            </div>
        `;
        }
    )
    .catch(function (error) {
        console.error('Error al obtener los datos del producto:', error);
    });
});