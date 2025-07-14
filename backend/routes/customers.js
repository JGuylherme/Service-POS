const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customers WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

router.post('/', async (req, res) => {
  const { name, email, document, phone_number } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const id = uuidv4();
    await db.query(
      'INSERT INTO customers (id, name, email, document, phone_number) VALUES (?, ?, ?, ?, ?)',
      [id, name, email || null, document || null, phone_number || null]
    );
    res.status(201).json({ message: 'Customer created', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

router.put('/:id', async (req, res) => {
  const { name, email, document, phone_number } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const [result] = await db.query(
      'UPDATE customers SET name = ?, email = ?, document = ?, phone_number = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, email || null, document || null, phone_number || null, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM customers WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router;
