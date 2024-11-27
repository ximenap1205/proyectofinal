const CATEGORIES_URL = "http://localhost:3000/cat"; 
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish_products"; 
const PRODUCTS_URL = "http://localhost:3000/products/"; 
const PRODUCT_INFO_URL = "http://localhost:3000/product_info/"; 
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/products_comments/"; 
const CART_INFO_URL = "http://localhost:3000/user_cart"; 
const CART_BUY_URL = "http://localhost:3000/cart"; 
const EXT_TYPE = "http://localhost:3000/ext_type"; 


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Productos dinamicos
let getProductData = function(productId) {
  return fetch(`http://localhost:3000/products/${productId}`)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw Error("Producto no encontrado");
          }
      })
      .then(data => {
          console.log(data); // Aca se puede procesar la información del producto
      })
      .catch(error => {
          console.error(error);
      });
};

//Comentarios dinamicos
let getCommentsData = function(productId) {
  return fetch(`http://localhost:3000/products_comments/${productId}`)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw Error("Comentarios no encontrados");
          }
      })
      .then(data => {
          console.log(data);  // Aca se puede procesar la información del producto
      })
      .catch(error => {
          console.error(error);
      });
};