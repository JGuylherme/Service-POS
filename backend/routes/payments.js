const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM payments');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM payments WHERE id = ?', [req.params.id]);
    res.json(rows[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { appointment_id, amount, method, paid_at, status } = req.body;
  const id = uuidv4();
  try {
    await db.query(
      `INSERT INTO payments (id, appointment_id, amount, method, paid_at, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, appointment_id, amount, method, paid_at, status]
    );
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { amount, method, paid_at, status } = req.body;
  try {
    await db.query(
      `UPDATE payments SET amount = ?, method = ?, paid_at = ?, status = ?, updated_at = NOW() WHERE id = ?`,
      [amount, method, paid_at, status, req.params.id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM payments WHERE id = ?', [req.params.id]);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
