const express = require('express');
const path = require('path');
const cors = require('cors'); // Importamos el paquete cors
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;
const SECRET_KEY = 'miclavesecretagrupo3';

app.use(cors());  // Permite solicitudes desde cualquier origen


// Middleware para parsear JSON (necesario para req.body)
app.use(express.json());

// Middleware para proteger rutas (JWT)
const verifyToken = (req, res, next) => {
    // Permitir acceso a /login sin token
    if (req.path === '/login') {
        return next(); 
    }

    // Verificar si el token está presente en los headers
    const token = req.headers["access-token"];
    if (!token) {
        return res.status(403).json({ message: "Access Token requerido" }); 
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next(); 
    } catch (err) {
       
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};

// Aplicar el middleware de autorización a todas las rutas
app.use(verifyToken);

// Ruta para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ message: 'Autenticación exitosa', token });
    } else {
        res.status(401).json({ error: 'Usuario y/o contraseña incorrectos' });
    }
});

// Ruta para los JSONs - Categories
app.get('/cat', (req, res) => {
    const filePath = path.join(__dirname, 'data/cats/cat.json');
    console.log('Buscando archivo en:', filePath); // Imprimir la ruta completa
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(500).send({ error: "No se pudo cargar el archivo de categorías" });
        }
    });
});


// Ruta para los JSONs - Publish Products
app.get('/publish_products', (req, res) => { // Cambié '/cat' a '/publish_products'
    res.sendFile(path.join(__dirname, 'data/sell/publish.json'));
});

// Ruta dinámica para devolver un producto según su ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id; // Obtenemos el ID del producto desde la URL
    const productPath = path.join(__dirname, 'data/products', `${productId}.json`); // Ruta del archivo JSON

    res.sendFile(productPath, (err) => {
        if (err) {
            res.status(404).send({ error: "Producto no encontrado" });
        }
    });
});

// Ruta dinámica para devolver un comentario según su ID
app.get('/products_comments/:id', (req, res) => {
    const productId = req.params.id;  // Obtenemos el ID del producto desde la URL
    const commentsPath = path.join(__dirname, 'data/products_comments', `${productId}.json`); // Ruta del archivo JSON correspondiente

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
