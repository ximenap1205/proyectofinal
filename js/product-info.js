document.addEventListener("DOMContentLoaded", function () {
    let containerInfo = document.getElementById('container-product-info');

    let productID = localStorage.getItem("productID");
    console.log("Product ID desde localStorage:", productID);

    const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    console.log("URL del producto:", PRODUCT_INFO_URL);

    getJSONData(PRODUCT_INFO_URL).then(function (res) {
        console.log("Datos recibidos:", res);

        containerInfo.innerHTML = '';

        let productInfo = res.data;

        containerInfo.innerHTML = `
            <div class="page">
                <div class="page-track">
                    <a class="link-track" href="products.html">${productInfo.category} </a> <p>  &#62 ${productInfo.name}</p>
                </div>
                <div class="card-product-info">
                    <div class="images-gallery">
                        <img src="${productInfo.images[0]}" class="img-card-info" alt="${productInfo.name}">
                        <div class="controlls">
                            <span class="btn-info active"></span>
                            <span class="btn-info"></span>
                            <span class="btn-info"></span>
                            <span class="btn-info"></span>
                        </div>
                    </div>
                    <div class="card-body-product-info">
                        <h2 class="card-title-product-info">${productInfo.name}</h2>
                        <a class="card-category-product-info" href="categories.html">${productInfo.category}</a>
                        <h5 class="price-product-info">USD: ${productInfo.cost}</h5>
                        <small class="text-muted">Cantidad vendidos: ${productInfo.soldCount}</small>
                        <p class="card-text-product-info">${productInfo.description}</p>
                    </div>
                </div>
            </div>  
        `;

            let image = document.getElementsByClassName("img-card-info")[0];
            let btn = document.getElementsByClassName("btn-info");

            function changeImage(i) {
                console.log(i);
                console.log(productInfo.images[i]);

                image.src = productInfo.images[i];
                for (let bt of btn) {
                    bt.classList.remove("active");
                }
                btn[i].classList.add("active");
            }

            for (let i = 0; i < btn.length; i++) {
                btn[i].addEventListener("click", function () {
                    changeImage(i);
                    console.log(i);
                });
            }

        }
    )
    .catch(function (error) {
        console.error('Error al obtener los datos del producto:', error);
    });
});