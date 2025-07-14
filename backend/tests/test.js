const db = require('./utils/db');

(async () => {
  try {
    const [rows] = await db.query('SELECT NOW() AS now');
    console.log('Database connected. Time:', rows[0].now);
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
})();
