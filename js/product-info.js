document.addEventListener("DOMContentLoaded", function () {
    let containerInfo = document.getElementById('container-product-info');
    let productID = localStorage.getItem("productID");
    
    const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    const PRODUCT_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

    getJSONData(PRODUCT_INFO_URL).then(function (res) {
        if (res.status === "ok") {
            let productInfo = res.data;
            containerInfo.innerHTML = `
                <div class="page">
                    <div class="page-track">
                        <a class="link-track" href="products.html">${productInfo.category}</a> <p>  &#62 ${productInfo.name}</p>
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
                            <a class="card-category-product-info" href="products.html">${productInfo.category}</a>
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
                image.src = productInfo.images[i];
                for (let bt of btn) {
                    bt.classList.remove("active");
                }
                btn[i].classList.add("active");
            }
            for (let i = 0; i < btn.length; i++) {
                btn[i].addEventListener("click", function () {
                    changeImage(i);
                });
            }

        
            getJSONData(PRODUCT_COMMENTS_URL).then(function (commentsRes) {
                if (commentsRes.status === "ok") {
                    let comments = commentsRes.data;
                    let commentsHTML = `<h3>Calificaciones:</h3>`;
                    comments.forEach(comment => {
                        let stars = '★'.repeat(comment.score) + '☆'.repeat(5 - comment.score);
                        commentsHTML += `
                            <div class="comment">
                                <strong>${comment.user}</strong> - <small>${new Date(comment.dateTime).toLocaleDateString()}</small>
                                <div class="stars">${stars}</div>
                                <p>${comment.description}</p>
                            </div>
                        `;
                    });
                    containerInfo.innerHTML += commentsHTML;
                }
            }).catch(function (error) {
                console.error('Error al obtener los comentarios del producto:', error);
            });

        }
    }).catch(function (error) {
        console.error('Error al obtener los datos del producto:', error);
    });
});