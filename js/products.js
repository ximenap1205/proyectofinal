let catID = localStorage.getItem("catID");

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
    console.log(id);
}

const PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

let container = document.getElementById('container-products');
let currentCategoriesArray = [];
let minCount = undefined;
let maxCount = undefined;

const ORDER_ASC_BY_PROD_COST = "ASC_COST";
const ORDER_DESC_BY_PROD_COST = "DESC_COST";
const ORDER_BY_PROD_COUNT = "COUNT";
let currentSortCriteria = undefined;

function showProducts() {
    getJSONData(PRODUCTS)
        .then(function (res) {
            let productos = res.data.products;
            currentCategoriesArray = productos;
            showCategoriesList();
        })
        .catch(function (error) {
            console.error(error);
        });
}

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PROD_COST) {
        result = array.sort((a, b) => a.cost - b.cost);
    } else if (criteria === ORDER_DESC_BY_PROD_COST) {
        result = array.sort((a, b) => b.cost - a.cost);
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort((a, b) => b.soldCount - a.soldCount);
    }
    return result;
}

function showCategoriesList(productsToShow) {
    container.innerHTML = '';

    let productos = productsToShow || currentCategoriesArray;

    for (let i = 0; i < productos.length; i++) {

        let producto = productos[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {

            let card = document.createElement('div');
            card.classList.add('card-product');
            card.setAttribute('data-id', producto.id);

            card.innerHTML = `
                <img src="${producto.image}" class="img-card" alt="${producto.name}">
                <div class="card-body-product">
                    <h5 class="card-title-product">${producto.name}</h5>
                    <p class="card-text-product">${producto.description}</p>
                    <h5 class="price-product">${producto.currency}: ${producto.cost}</h5>
                    <small class="text-muted">Cantidad vendidos: ${producto.soldCount}</small>
                </div>
            `;

            card.addEventListener('click', function () {
                let productID = card.getAttribute('data-id');
                console.log(productID);
                setProductID(productID);
            });

            container.appendChild(card);
        }
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    showCategoriesList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    showProducts();

    document.getElementById("bot1").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_PROD_COST); // Orden ascendente por precio
    });

    document.getElementById("bot2").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_PROD_COST); // Orden descendente por precio
    });

    document.getElementById("bot3").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT); // Orden por cantidad vendida
    });

    document.getElementById("limpiar").addEventListener("click", function () {
        document.getElementById("min").value = "";
        document.getElementById("max").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("filtrar").addEventListener("click", function () {
        minCount = document.getElementById("min").value;
        maxCount = document.getElementById("max").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showCategoriesList();
    });

    // Visibilidad del nombre de usuario

    let userName = localStorage.getItem('email');
    let userContainer = document.getElementById("user");

    if (userName) {
        userContainer.innerHTML = `
            <a id="user-container" class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"></a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
                <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a id="logout-btn" class="dropdown-item" href="#">Cerrar Sesión</a></li>
            </ul>
        `;
        document.getElementById("user-container").textContent = userName;
      
        document.getElementById('register-link').style.display = 'none';
    } else {
        userContainer.innerHTML = '';
    }

    //Funcionalidad para el boton de cerrar sesion.

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function (event) {
            event.preventDefault();

            localStorage.removeItem('email'); 
            localStorage.removeItem('nombre');
            localStorage.removeItem('segundoNombre');
            localStorage.removeItem('apellido');
            localStorage.removeItem('segundoApellido');
            localStorage.removeItem('telefono');
            localStorage.removeItem('foto')

            document.getElementById("user").innerHTML = '';
          
            location.replace('login.html');
        });
    }
});

let input = document.getElementById('busqueda');/// esto los que nos dio nati en la pagina 

// me debe filtrar en tiempo real
input.addEventListener('input', function () {
    let query = input.value.toLowerCase();
    let filteredProducts = currentCategoriesArray.filter(producto =>
      producto.name.toLowerCase().includes(query) ||  /// como indica filtra titulo
      producto.description.toLowerCase().includes(query)/// como indica filtra la descripcion d
    );
    showCategoriesList(filteredProducts);
  });
