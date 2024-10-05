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
                        <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <!-- botones -->
                            </div>
                            <div class="carousel-inner" id="carouselImages">
                                <!-- imagenes -->
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
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

    
            const carouselImages = document.getElementById("carouselImages");
            const carouselIndicators = document.querySelector(".carousel-indicators");
            const images = productInfo.images; // Asegúrate de que este array exista

            // Crear imágenes del carrusel
            images.forEach((image, i) => {
            const isActive = i === 0 ? 'active' : '';

            carouselImages.innerHTML += `
                <div class="carousel-item ${isActive}">
                    <img src="${image}" class="d-block w-100" alt="${productInfo.name}">
                </div>
            `;

            // Crear indicadores
            carouselIndicators.innerHTML += `
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" class="${isActive}" aria-current="${isActive ? 'true' : 'false'}" aria-label="Slide ${i + 1}"></button>
            `;
            });

            // Agregar evento de clic a los botones del indicador
            const indicatorButtons = document.querySelectorAll(".carousel-indicators button");
            indicatorButtons.forEach((button, index) => {
                button.addEventListener("click", () => {
                    // Cambiar la imagen activa en el carrusel
                    document.querySelectorAll('.carousel-item').forEach((item, i) => {
                        item.classList.remove('active'); // Remover la clase 'active' de todas las imágenes
                        if (i === index) {
                            item.classList.add('active'); // Añadir la clase 'active' solo a la imagen correspondiente
                        }
                    });

                    // Cambiar el estado de los indicadores
                    indicatorButtons.forEach((btn) => {
                        btn.classList.remove('active'); // Remover la clase 'active' de todos los indicadores
                    });
            
                    button.classList.add('active'); // Añadir la clase 'active' solo al botón correspondiente
                });
            });


        
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