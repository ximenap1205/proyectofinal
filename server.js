const express = require('express');
const path = require('path');
const app = express();

const PORT = 3000;

// Ruta para los JSONs - Categories 
app.get('/cat', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/cats/cat.json'));
});

// Ruta para los JSONs - Publish Products 
app.get('/cat', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/sell/publish.json'));
});

// Ruta dinámica para devolver un producto según su ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id; // Obtenemos el ID del producto desde la URL
    const productPath = path.join(__dirname, 'data/products', `${productId}.json`); // Ruta del archivo JSON

    // Mensaje de error si no encuentra el producto
    res.sendFile(productPath, (err) => {
        if (err) {
            res.status(404).send({ error: "Producto no encontrado" });
        }
    });
});

// Ruta dinámica para devolver un comentario según su ID
app.get('/products_comments/:id', (req, res) => {
    const productId = req.params.id;  // Obtenemos el ID del producto desde la URL
    const commentsPath = path.join(__dirname, 'data/products_comments', `${productId}.json`);  //Ruta al archivo JSON correspondiente


    res.sendFile(commentsPath, (err) => {
        if (err) {
            res.status(404).send({ error: "Comentarios no encontrados para este producto" });  // Si hay error
        }
    });
});

// Ruta para los JSONs - Cart Info
app.get('/user_cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/user_cart/25801.json'));
});

// Ruta para los JSONs - Cart Buy
app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'data/cart/buy.json'));
});

// Ruta genérica para probar
app.get('/publish', (req, res) => {
    res.json({ message: "Publicación realizada con éxito." });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
