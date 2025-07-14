const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email, password_hash, role, phone_number } = req.body;
  const id = uuidv4();

  try {
    await db.query(
      `INSERT INTO employees (id, name, email, password_hash, role, phone_number)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, email, password_hash, role, phone_number]
    );
    res.status(201).json({ message: 'Employee created', id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { name, email, password_hash, role, phone_number } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE employees SET name = ?, email = ?, password_hash = ?, role = ?, phone_number = ?, updated_at = NOW()
       WHERE id = ?`,
      [name, email, password_hash, role, phone_number, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
