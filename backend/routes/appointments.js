const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM appointments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { customer_id, employee_id, service_id, start_time, end_time, status, notes } = req.body;
  try {
    const id = uuidv4();
    await db.query(
      'INSERT INTO appointments (id, customer_id, employee_id, service_id, start_time, end_time, status, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, customer_id, employee_id, service_id, start_time, end_time, status, notes]
    );
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, status, notes } = req.body;
  try {
    await db.query(
      'UPDATE appointments SET start_time = ?, end_time = ?, status = ?, notes = ?, updated_at = NOW() WHERE id = ?',
      [start_time, end_time, status, notes, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
