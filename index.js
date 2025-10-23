const express = require('express');
const cors = require('cors'); // Necesario para CORS
const sequelize = require('./db');
const clienteRoutes = require('./cliente');
require('dotenv').config();

const app = express(); // 👈 SOLO DEBE HABER UNA VEZ

// 1. Configuración de CORS
app.use(cors({
    origin: ['http://localhost:5173', 'https://frontend-iota-olive-18.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// 2. Conexión a PostgreSQL (Se ejecuta una sola vez al inicio)
sequelize.authenticate()
    .then(() => console.log("✅ ¡Te conectaste a PostgreSQL!"))
    .catch(err => console.error("❌ Error de conexión:", err));

// 3. Rutas
app.use('/api/clientes', clienteRoutes);

// Ruta raíz para probar backend
app.get('/', (req, res) => {
    res.send('Backend funcionando ✅');
});

// 4. Iniciar Servidor (Se llama una sola vez)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});