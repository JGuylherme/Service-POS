const express = require('express');
const router = express.Router();
const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM time_tracking');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM time_tracking WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Record not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { appointment_id, employee_id, start_time, end_time } = req.body;
  const id = uuidv4();
  try {
    await db.query(
      `INSERT INTO time_tracking (id, appointment_id, employee_id, start_time, end_time)
       VALUES (?, ?, ?, ?, ?)`,
      [id, appointment_id, employee_id, start_time, end_time]
    );
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const { appointment_id, employee_id, start_time, end_time } = req.body;
  try {
    const [result] = await db.query(
      `UPDATE time_tracking
       SET appointment_id = ?, employee_id = ?, start_time = ?, end_time = ?, updated_at = NOW()
       WHERE id = ?`,
      [appointment_id, employee_id, start_time, end_time, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Record not found' });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM time_tracking WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Record not found' });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
