const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender formato JSON y permitir conexiones
app.use(express.json());
app.use(cors());

// Servir tus archivos de diseño (HTML, CSS, JS del cliente)
app.use(express.static('public'));

// Base de datos simulada en el servidor (temporal antes de conectar la DB definitiva)
let usuarios = [];
let publicaciones = [
    { id: 1, user: '@sofia_arte', text: 'Hoy logré terminar mi primera pintura al óleo...', tags: ['✨ Inspira'], valuesCount: 42 }
];

// RUTAS (API Endpoints)

// 1. Registro de usuario
app.post('/api/registro', (req, res) => {
    const { username, email, password } = req.body;
    // Aquí se debería encriptar la contraseña (ej. con bcrypt) antes de guardar
    const nuevoUsuario = { username, email, password };
    usuarios.push(nuevoUsuario);
    res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario: { username, email } });
});

// 2. Obtener todas las publicaciones (Feed)
app.get('/api/publicaciones', (req, res) => {
    res.json(publicaciones);
});

// 3. Crear una nueva publicación
app.post('/api/publicaciones', (req, res) => {
    const { user, text } = req.body;
    const nuevaPost = {
        id: Date.now(),
        user,
        text,
        tags: ['🌱 Aporta'],
        valuesCount: 0
    };
    publicaciones.unshift(nuevaPost);
    res.status(201).json(nuevaPost);
});

app.listen(PORT, () => {
    console.log(`Servidor de la Beta corriendo en http://localhost:${PORT}`);
});
