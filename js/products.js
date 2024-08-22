document.addEventListener("DOMContentLoaded", function(){
    const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 

    getJSONData(PRODUCTS_URL).then(function(resultado){
        if (resultado.status === 'ok') {
            console.log("Datos recibidos:", resultado.data.productos);
            showProduct(resultado.data.productos);
        } else {
            console.error("Error al obtener los datos: ", resultado.data.productos);
        }
    });
});

function showProduct(array) {

    let show = document.querySelector(".pb-5"); 

    if (!show) {
        console.error("El contenedor con clase 'pb-5' no se encuentra en el DOM.");
        return;
    }

    show.innerHTML = '';

    array.forEach((productos) => {
        show.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${productos.imagen}" class="card-img-top" alt="${productos.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${productos.nombre}</h5>
                        <p class="card-text">${productos.description}</p>
                        <h5 class="card-text">Precio: ${productos.moneda} ${productos.costo}</h5>
                        <small class="text-muted">Cantidad vendidos: ${productos.VendidoCount}</small>
                    </div>
                </div>
            </div>
        `;
    });
}
