let catID = localStorage.getItem("catID");

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}

const PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

let container = document.getElementById('container-products');


getJSONData(PRODUCTS).then(function(res) {
    let productos = res.data.products;
    currentCategoriesArray = productos; 

    showCategoriesList(); 
})

.catch(function(error) {
    console.error(error);
});

const ORDER_ASC_BY_PROD_COST = "ASC_COST";
const ORDER_DESC_BY_PROD_COST = "DESC_COST";
const ORDER_BY_PROD_COUNT = "COUNT";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;


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


function showCategoriesList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let producto = currentCategoriesArray[i];

      
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))) {

            htmlContentToAppend += `
                <div class="card-product">
                    <img src="${producto.image}" class="img-card" alt="${producto.name}">
                    <div class="card-body-product">
                        <h5 class="card-title-product">${producto.name}</h5>
                        <p class="card-text-product">${producto.description}</p>
                        <h5 class="price-product">USD: ${producto.cost}</h5>
                        <small class="text-muted">Cantidad vendidos: ${producto.soldCount}</small>
                    </div>
                </div>
            `;
        }
    }
    document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
    document.addEventListener("DOMContentLoaded", function(e){
        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok"){
                currentCategoriesArray = resultObj.data
                showCategoriesList()
    
            }
        });
   
    document.getElementById("bot1").addEventListener("click", function() {
        sortAndShowCategories(ORDER_ASC_BY_PROD_COST); 
    });

    document.getElementById("bot2").addEventListener("click", function() {
        sortAndShowCategories(ORDER_DESC_BY_PROD_COST); 
    });

    document.getElementById("bot3").addEventListener("click", function() {
        sortAndShowCategories(ORDER_BY_PROD_COUNT); 
    });

    
    document.getElementById("limpiar").addEventListener("click", function() {
        document.getElementById("min").value = "";
        document.getElementById("max").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    
    document.getElementById("filtrar").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar
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
});