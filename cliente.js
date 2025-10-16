const express = require('express');
const router = express.Router();
const sequelize = require('./db'); // conexión a PostgreSQL

// ✅ Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    // Ejecuta la consulta SQL directamente
    const [results, metadata] = await sequelize.query('SELECT * FROM clientes');
    res.json(results); // Devuelve los resultados en formato JSON
  } catch (error) {
    console.error('❌ Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

module.exports = router;
