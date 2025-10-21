const express = require('express');
const router = express.Router();
const sequelize = require('./db');

// GET todos los clientes
router.get('/', async (req, res) => {
  try {
    console.log('entre kiii')
    const results = await sequelize.query('SELECT * FROM clientes', {
      type: sequelize.QueryTypes.SELECT
    });
    res.send(results);
  } catch (error) {
    console.error('❌ Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
});

// POST cliente nuevo (opcional)
router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono } = req.body;
    const query = `
      INSERT INTO clientes (nombre, apellido, email, telefono)
      VALUES (:nombre, :apellido, :email, :telefono)
      RETURNING *;
    `;
    const [result] = await sequelize.query(query, {
      replacements: { nombre, apellido, email, telefono },
      type: sequelize.QueryTypes.INSERT
    });
    res.status(201).json(result);
  } catch (error) {
    console.error('❌ Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
});

module.exports = router;
