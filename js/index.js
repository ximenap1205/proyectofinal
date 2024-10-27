document.addEventListener("DOMContentLoaded", function() {
    const autos = document.getElementById("autos");
    const juguetes = document.getElementById("juguetes");
    const muebles = document.getElementById("muebles");

    if (autos) {
        autos.addEventListener("click", function() {
            localStorage.setItem("catID", 101);
            window.location = "products.html";
        });
    }

    if (juguetes) {
        juguetes.addEventListener("click", function() {
            localStorage.setItem("catID", 102);
            window.location = "products.html";
        });
    }

    if (muebles) {
        muebles.addEventListener("click", function() {
            localStorage.setItem("catID", 103);
            window.location = "products.html";
        });
    }
});