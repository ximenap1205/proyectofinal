document.addEventListener("DOMContentLoaded", function () {
    let containerInfo = document.getElementById('container-product-info');
    let productID = localStorage.getItem("productID");
    let containerComments = document.getElementById('container-comments');
    
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
                    containerComments.innerHTML += commentsHTML;
                }
            }).catch(function (error) {
                console.error('Error al obtener los comentarios del producto:', error);
            });

        }
    }).catch(function (error) {
        console.error('Error al obtener los datos del producto:', error);
    });
});




let comments = []; // Array para almacenar los comentarios
let selectedRating = 0; // Variable para almacenar la calificación seleccionada

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

// Función para mostrar los comentarios
function displayComments() {
    const commentsListContainer = document.getElementById('container-new-comments');
    commentsListContainer.innerHTML = ''; // Limpiar la lista existente

    comments.forEach(({ message, rating, username }) => {
        const commentItem = document.createElement('div');
        commentItem.innerHTML = `
        <div class="list-group-item">
            <p><strong>${username} <br> </strong></p>
            <div class="stars">${getStarsHtml(rating)}</div>

            <p>${message}</p>
        </div>
        `;
        commentsListContainer.appendChild(commentItem);
    });
}

// Función para obtener el HTML de las estrellas según la calificación
function getStarsHtml(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHtml += '<i class="bi bi-star-fill text-warning"></i>'; // Estrella llena
        } else {
            starsHtml += '<i class="bi bi-star-fill"></i>'; // Estrella vacía
        }
    }
    return starsHtml;
}

// Manejo del envío del formulario
document.querySelector('.comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const messageInput = document.getElementById('msg');
    const usernameInput = document.getElementById('username'); // Obtener el nombre del usuario
    const newComment = messageInput.value.trim();
    const username = usernameInput.value.trim(); // Obtener el valor del nombre del usuario

    // Agregar el nuevo comentario, calificación y nombre al array
    if (newComment && selectedRating > 0 && username) {
        comments.push({ message: newComment, rating: selectedRating, username: username });
        displayComments(); // Mostrar los comentarios actualizados

        // Limpiar los campos de entrada
        messageInput.value = '';
        usernameInput.value = ''; // Limpiar el campo del nombre de usuario
        selectedRating = 0; // Reiniciar calificación
        highlightStars(0); // Reiniciar estrellas
    }
});

// Cargar los comentarios iniciales si es necesario
window.onload = function() {
    comments = []; // Comentarios iniciales vacíos
    displayComments(); // Mostrar la lista vacía
};
