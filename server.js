const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Servir archivos estáticos de la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// "Base de datos" temporal en el servidor
let publicaciones = [
    { id: 1, user: '@sofia_arte', text: 'Hoy logré terminar mi primera pintura al óleo tras meses de práctica diaria. La constancia valió la pena. ✨', tags: ['✨ Inspira', '🌱 Aporta'], valuesCount: 42, time: 'Hace 2 horas' },
    { id: 2, user: '@lucas_verde', text: 'Pequeño recordatorio para hoy: desactiva las notificaciones un par de horas. Tu mente merece un respiro tranquilo. 🌿', tags: ['🤝 Empatía'], valuesCount: 15, time: 'Hace 5 horas' }
];

// RUTAS DE LA API

// Obtener todas las publicaciones (Feed)
app.get('/api/publicaciones', (req, res) => {
    res.json(publicaciones);
});

// Crear una nueva publicación
app.post('/api/publicaciones', (req, res) => {
    const { user, text } = req.body;
    if (!user || !text) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }
    const nuevaPost = {
        id: Date.now(),
        user,
        text,
        tags: ['🌱 Aporta'],
        valuesCount: 0,
        time: 'Hace un momento'
    };
    publicaciones.unshift(nuevaPost);
    res.status(201).json(nuevaPost);
});

// Reaccionar con valor a una publicación
app.post('/api/publicaciones/:id/valorar', (req, res) => {
    const id = parseInt(req.params.id);
    const post = publicaciones.find(p => p.id === id);
    if (post) {
        post.valuesCount += 1;
        return res.json(post);
    }
    res.status(404).json({ error: 'Publicación no encontrada' });
});

// Usamos app.use en lugar de app.get y removemos cualquier comodín.
// Esto atrapará cualquier ruta que no haya hecho match con las anteriores.
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor de Nexus corriendo en el puerto ${PORT}`);
});
