document.addEventListener("DOMContentLoaded", function () {
    let containerInfo = document.getElementById('container-product-info');
    let productID = localStorage.getItem("productID");
    
    const PRODUCT_INFO_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    const PRODUCT_COMMENTS_URL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;

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
                            <h5 class="price-product-info">USD: ${productInfo.cost}</h5>
                            <small class="text-muted">Cantidad vendidos: ${productInfo.soldCount}</small>
                            <p class="card-text-product-info">${productInfo.description}</p>
                        </div>
                    </div>
                </div>
            `;

            console.log("Product info:", productInfo);

            // Agregar imágenes al carrusel
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
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="${i}" class="${isActive}" aria-current="${isActive ? 'true' : 'false'}" aria-label="Slide ${i + 1}"></button>
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

            console.log("Carousel images added:", images);

            getJSONData(PRODUCT_COMMENTS_URL).then(function (commentsRes) {
                if (commentsRes.status === "ok") {
                    initialComments = commentsRes.data;
                    loadComments() // Mostrar comentarios
                }
            }).catch(function (error) {
                console.error('Error al obtener los comentarios del producto:', error);
            });

        }
    }).catch(function (error) {
        console.error('Error al obtener los datos del producto:', error);
    });


let initialComments = []; // Variable para almacenar los comentarios iniciales
let comments = []; // Array para almacenar todos los comentarios combinados
let newComments = []; // Array para almacenar los comentarios de sessionStorage
let selectedRating = 0; // Variable para almacenar la calificación seleccionada
let containerComments = document.getElementById('container-comments');

if (!containerComments) {
    console.error('Error: No se encuentra el contenedor de comentarios.');
}

// Función para cargar y mostrar los comentarios almacenados
function loadComments() {
    // Cargar comentarios de localStorage y sessionStorage
    const storedNewComments = JSON.parse(sessionStorage.getItem('newComments')) || [];
    
    // Combinar los comentarios iniciales con los almacenados
    comments = [...initialComments, ...storedNewComments];

    if (comments.length === 0) {
        containerComments.innerHTML = `<p>No hay comentarios aún. Sé el primero en dejar uno!</p>`;
    } else {
        containerComments.innerHTML = `<h3>Calificaciones:</h3>`;
        comments.forEach(comment => addCommentToDOM(comment));
    }
    console.log("Comments loaded:", comments);
}

// Función para agregar un comentario al DOM con el formato adecuado
function addCommentToDOM(comment) {
    let stars = '★'.repeat(comment.score) + '☆'.repeat(5 - comment.score);

    containerComments.innerHTML += `
        <div class="comment">
            <strong>${comment.user}</strong> - <small>${new Date(comment.dateTime).toLocaleDateString()}</small>
            <div class="stars">${stars}</div>
            <p>${comment.description}</p>
        </div>
    `;
}

// Manejar el evento de selección de calificación
document.querySelectorAll('.rating i').forEach(star => {
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.getAttribute('data-value'));
        highlightStars(selectedRating);
    });
});

// Función para resaltar las estrellas según la calificación seleccionada
function highlightStars(rating) {
    const stars = document.querySelectorAll('.rating i');
    stars.forEach(star => {
        if (parseInt(star.getAttribute('data-value')) <= rating) {
            star.classList.add('text-warning'); // Cambia el color de las estrellas llenas
        } else {
            star.classList.remove('text-warning'); // Quita el color de las estrellas vacías
        }
    });
}

// Nueva función para manejar el envío del formulario
function handleCommentSubmit(event) {
    event.preventDefault();

    const messageInput = document.getElementById('msg');
    const usernameInput = document.getElementById('username');
    const newComment = messageInput.value.trim();
    const username = usernameInput.value.trim();

    console.log("Comment submission attempt:", { newComment, username, selectedRating });

    if (!newComment || selectedRating === 0 || !username) {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.innerHTML = `
            Por favor, completa todos los campos para enviar tu comentario.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        alertPlaceholder.append(alert);

        // Desaparece la alerta después de 3 segundos
        setTimeout(() => {
            alert.remove();
        }, 3000);

        return; // Detener el envío si los campos no están completos
    }

    const dateTime = new Date().toISOString();
    const commentData = { description: newComment, score: selectedRating, user: username, dateTime };

    addNewComment(commentData); // Guardar en sessionStorage

}

// Nueva función para agregar el comentario y manejar el almacenamiento en sessionStorage
function addNewComment(commentData) {
    const newComment = {
        product: productID , // Asegúrate de usar el ID correcto del producto
        score: commentData.score,
        description: commentData.description,
        user: commentData.user,
        dateTime: commentData.dateTime
    };

    // Verifica si hay comentarios en sessionStorage y los carga
    if (sessionStorage.getItem('newComments')) {
        newComments = JSON.parse(sessionStorage.getItem('newComments'));
    }

    newComments.push(newComment);
    saveNewCommentsToSessionStorage(); // Guardar en sessionStorage

    // Agregar el nuevo comentario al DOM
    addCommentToDOM(newComment);

    // Mostrar alerta de Bootstrap
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show';
    alert.innerHTML = `
        Comentario enviado exitosamente!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertPlaceholder.append(alert);

    // Desaparece la alerta después de 3 segundos
    setTimeout(() => {
        alert.remove();
    }, 3000); // 3000 milisegundos = 3 segundos

    // Limpiar el formulario
    document.getElementById("comment-form").reset();
    selectedRating = 0;
    highlightStars(0);
}

// Manejo del envío del formulario
document.querySelector('.comment-form').addEventListener('submit', handleCommentSubmit);

// Función para guardar nuevos comentarios en sessionStorage
function saveNewCommentsToSessionStorage() {
    sessionStorage.setItem('newComments', JSON.stringify(newComments));
    console.log("Nuevo comentario a sessionStorage:", newComments);
}

});

