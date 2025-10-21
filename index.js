const express = require('express');
const sequelize = require('./db');
const clienteRoutes = require('./cliente');
require('dotenv').config();

const app = express();
app.use(express.json());

// Conexión a PostgreSQL
sequelize.authenticate()
  .then(() => console.log("✅ ¡Te conectaste a PostgreSQL!"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Rutas
app.use('/api/clientes', clienteRoutes);

// Ruta raíz para probar backend
app.get('/', (req, res) => {
  res.send('Backend funcionando ✅');
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});


