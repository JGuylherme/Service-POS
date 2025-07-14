const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./utils/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    res.json({ message: 'API working!', db_time: rows[0].now });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

const routes = require('./routes');
app.use('/api', routes);