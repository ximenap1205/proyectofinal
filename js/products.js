const PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let container = document.getElementById('container-autos')


getJSONData(PRODUCTS).then(function(res){
    let productos = res.data.products;

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        container.innerHTML += `
    <div class="card">
        <img src="${producto.image}" class="img-card" alt="${producto.name}">
        <div class="card-body">
            <h5 class="card-title">${producto.name}</h5>
            <p class="card-text">${producto.description}</p>
            <h5 class="price">${producto.cost}</h5>
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
