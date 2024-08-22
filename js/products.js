const PRODUCTS = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let container = document.getElementById('container-autos')


getJSONData(PRODUCTS).then(function(res){
    let productos = res.data.products;

    for (let i = 0; i < productos.length; i++) {
        const producto = productos[i];
        container.innerHTML += `
    <div>
        <h5>${producto.name}</h5>
        <img src="${producto.image}" alt="${producto.name}">
        <p>${producto.description}</p>
        <p class="price">${producto.cost}</p>
        <p>Cantidad vendidos: ${producto.soldCount}</p>
      </div>
      `
    }
    console.log(res)
})

.catch(function(error){
    console.error(error)
})
