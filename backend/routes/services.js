const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

// GET all services
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a service by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Service not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new service
router.post('/', async (req, res) => {
  const { name, description, price, duration_min } = req.body;
  const id = uuidv4();

  try {
    await db.query(
      `INSERT INTO services (id, name, description, price, duration_min) VALUES (?, ?, ?, ?, ?)`,
      [id, name, description, price, duration_min]
    );
    res.status(201).json({ message: 'Service created', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a service
router.put('/:id', async (req, res) => {
  const { name, description, price, duration_min } = req.body;

  try {
    const [result] = await db.query(
      `UPDATE services SET name = ?, description = ?, price = ?, duration_min = ?, updated_at = NOW()
       WHERE id = ?`,
      [name, description, price, duration_min, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a service
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM services WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Service not found' });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
