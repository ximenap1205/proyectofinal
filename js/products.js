const catID = localStorage.getItem("catID");
if (!catID) {
  console.error("No se encontró el identificador de la categoría.");
}

const PRODUCTS = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

let container = document.getElementById('container-products')

getJSONData(PRODUCTS).then(function(res){
    let productos = res.data.products;

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        container.innerHTML += `
    <div class="card-product">
        <img src="${producto.image}" class="img-card" alt="${producto.name}">
        <div class="card-body-product">
            <h5 class="card-title-product">${producto.name}</h5>
            <p class="card-text-product">${producto.description}</p>
            <h5 class="price-product">USD: ${producto.cost}</h5>
            <small class="text-muted">Cantidad vendidos: ${producto.soldCount}</small>
        </div>
      </div>
      `
    }
    console.log(res)
})

.catch(function(error){
    console.error(error)
})
