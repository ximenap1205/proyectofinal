document.addEventListener("DOMContentLoaded", function () {
    let containerInfo = document.getElementById('container-product-info');
    let productID = localStorage.getItem("productID");
    
    const PRODUCT_INFO_URL = `http://localhost:3000/products/${productID}`;
    const PRODUCT_COMMENTS_URL = `http://localhost:3000/products_comments/${productID}`;

    console.log(`Fetch producto info ID: ${productID}`);

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
                            <h5 class="price-product-info">${productInfo.currency}: ${productInfo.cost}</h5>
                            <small class="text-muted">Cantidad vendidos: ${productInfo.soldCount}</small>
                            <p class="card-text-product-info">${productInfo.description}</p>
                            <button id="btnComprar" class="btn btn-success">Comprar</button>
                        </div>
                    </div>
                </div>
            `;

            console.log("Productos info:", productInfo);

            document.getElementById("btnComprar").addEventListener("click", () => {

                // Recupera la lista de productos del local storage o crea un nuevo array si no existe
                let productsInCart = JSON.parse(localStorage.getItem("productos")) || [];

                // Verificar si el producto ya existe en el carrito
                const productoExistente = productsInCart.find(prod => prod.id === productInfo.id);

                if (productoExistente) {
                    // Si ya existe, incrementa la cantidad
                    productoExistente.quantity++;
                } else {
                    // Si no existe, agregarlo con cantidad 1
                    productsInCart.push({ ...productInfo, quantity: 1 });
                }

                // Guarda la lista actualizada de productos en localStorage
                localStorage.setItem("productos", JSON.stringify(productsInCart));

                console.log(JSON.parse(localStorage.getItem("productos")));
                console.log("Productos en carrito:", productsInCart);

                // Redirigir a cart.html
                window.location.href = "cart.html";
            });


            const carouselImages = document.getElementById("carouselImages");
            const carouselIndicators = document.querySelector(".carousel-indicators");
            const images = productInfo.images;

            // imágenes para carrusel
            images.forEach((image, i) => {
                let isActive = '';
                if (i === 0) {
                    isActive = 'active'; // si es la primera imagen asigna 'active'
                }

                carouselImages.innerHTML += `
                    <div class="carousel-item ${isActive}">
                        <img src="${image}" class="d-block w-100" alt="${productInfo.name}">
                    </div>
                `;

                carouselIndicators.innerHTML += `
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="${i}" class="${isActive}" aria-current="${isActive ? 'true' : 'false'}" aria-label="Slide ${i + 1}"></button>
                `;
            });

            // evento de clic a los botones del indicador para entrar a la imagen
            const indicatorButtons = document.querySelectorAll(".carousel-indicators button");
            indicatorButtons.forEach((btn, index) => {
                btn.addEventListener("click", () => {
                    // cambiar la imagen activa en el carrusel
                    document.querySelectorAll('.carousel-item').forEach((item, i) => {
                        item.classList.remove('active'); // eliminar la clase 'active' de todas las imagenes
                        if (i === index) {
                            item.classList.add('active'); // agregar la clase 'active' solo a la imagen seleccionada
                        }
                    });

                    // cambiar el indicador activo
                    indicatorButtons.forEach((btn) => {
                        btn.classList.remove('active'); // eliminar la clase 'active' de todas las imagenes
                    });
            
                    btn.classList.add('active'); // agregar la clase 'active' solo al indicador seleccionado
                });
            });

            console.log("Carrousel imagenes:", images);

            getJSONData(PRODUCT_COMMENTS_URL).then(function (commentsRes) {
                if (commentsRes.status === "ok") {
                    initialComments = commentsRes.data;
                    showComments()
                }
            })
            .catch(function (error) {
                console.error('Error al obtener los comentarios del producto:', error);
            });

            // productos relacionados
            let relatedProducts = productInfo.relatedProducts; // array de productos relacionados
            let relatedProductsContainer = document.getElementById('related-products-container');

            let sectionTitle = document.createElement("h3");
            sectionTitle.className = "text-center my-4";
            sectionTitle.innerText = "Productos Relacionados";

            relatedProductsContainer.before(sectionTitle);
            relatedProductsContainer.classList.add('row', "justify-content-evenly",'g-3');

            relatedProducts.forEach(function (relatedProduct) {
                let relatedProductElement = document.createElement("div");
                relatedProductElement.className = "col-sm-6 col-md-4 col-lg-3 text-center";
                relatedProductElement.setAttribute('data-id', relatedProduct.id);
                relatedProductElement.innerHTML = `
                            <div class="card h-100">
                                <img src="${relatedProduct.image}" class="card-img-top" alt="${relatedProduct.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${relatedProduct.name}</h5>
                                </div>
                            </div>
                `;

                // Actualizar el productID en localStorage al hacer clic en el producto relacionado
                relatedProductElement.addEventListener('click', function() {
                    localStorage.setItem("productID", relatedProduct.id);
                    window.location = "product-info.html";
                });

                relatedProductsContainer.appendChild(relatedProductElement);
            });
            

        }
    }).catch(function (error) {
        console.error('Error al obtener los datos del producto:', error);
    });


    let comments = []; // los comentarios combinados 
    let selectedRating = 0; // calificación seleccionada
    let containerComments = document.getElementById('container-comments');

    // funcion para mostrar los comentarios guardados
    function showComments() {

        const newFormComments = JSON.parse(sessionStorage.getItem('newComments')) || [];
    
        // obtener solo los comentarios del productID actual
        const newCommentsForCurrentProduct = newFormComments[productID] || [];
        
        // combinar los comentarios iniciales con los nuevos
        comments = initialComments.concat(newCommentsForCurrentProduct);

        containerComments.innerHTML = `<h3>Calificaciones:</h3>`;
        if (comments.length === 0) {
            containerComments.innerHTML += `<p>¡Sé el primero en comentar!</p>`;
        } else {comments.forEach(comment => {
            let stars = '★'.repeat(comment.score) + '☆'.repeat(5 - comment.score);
            containerComments.innerHTML += `
                <div class="comment">
                    <strong>${comment.user}</strong> - <small>${new Date(comment.dateTime).toLocaleDateString()}</small>
                    <div class="stars">${stars}</div>
                    <p>${comment.description}</p>
                </div>
            `;
            });
        }
    }
    
    console.log("Comentarios:", comments);

    // seleccion de calificacion que devuelve un numero
    document.querySelectorAll('.rating i').forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            highlightStars(selectedRating);
        });
    });

    // resaltar las estrellas segun la calificacion seleccionada
    function highlightStars(rating) {
        const stars = document.querySelectorAll('.rating i');
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= rating) {
                star.classList.add('star-custom'); // cambio color estrellas llenas
            } else {
                star.classList.remove('star-custom'); // saca color estrellas vacías
            }
        });
    }   

    // envío del formulario
    function commentSubmit(event) {
        event.preventDefault();

        const messageInput = document.getElementById('msg');
        const newComment = messageInput.value.trim();
        const email = localStorage.getItem('email');
        const firstName = localStorage.getItem('nombre');
        const lastName = localStorage.getItem('apellido');

        let username;

        // verifica si hay nombre y apellido
        if (firstName && lastName) {
            username = `${firstName}_${lastName}`.toLowerCase(); // usa nombre y apellido
        } else if (email) {
            username = email.toLowerCase(); // usa email si no hay nombre y apellido
        } else {
            username = null; // si no hay nada, username es null
        }

        console.log("Comment submission attempt:", { newComment, username, selectedRating });

        if (!newComment || selectedRating === 0 || !username) {
            showAlert();
            return; // no se envia si no esta completo
        }

        const dateTime = new Date().toISOString();
        const commentData = { description: newComment, score: selectedRating, user: username, dateTime };

        addNewComment(commentData); // guardar en sessionStorage

    }
    
    function showAlert() {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
            const alert = document.createElement('div');
            alert.className = 'alert alert-danger alert-dismissible fade show';
            alert.innerHTML = `
                Por favor, completa todos los campos para enviar tu comentario.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            alertPlaceholder.append(alert); // alerta para completar los campos para poder enviar

            setTimeout(() => {
                alert.remove();
            }, 3000);
    }
    

    // agregar el comentario y almacenamiento en sessionStorage
    function addNewComment(commentData) {
        const newComment = {
            product: productID , 
            score: commentData.score,
            description: commentData.description,
            user: commentData.user,
            dateTime: commentData.dateTime
        };

        let existingComments = JSON.parse(sessionStorage.getItem('newComments')) || {};

        if (!existingComments[productID]) {
            existingComments[productID] = [];
        }
        existingComments[productID].push(newComment);

        sessionStorage.setItem('newComments', JSON.stringify(existingComments));
        showComments();
        showSuccessAlert('¡Comentario enviado exitosamente!');

        // limpia el formulario
        document.getElementById("comment-form").reset();
        selectedRating = 0;
        highlightStars(0);
    }

    function showSuccessAlert(message) {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertPlaceholder.append(alert);
    
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }    

    // envío del formulario, se ejecuta la funcion
    document.querySelector('.comment-form').addEventListener('submit', commentSubmit);

});

