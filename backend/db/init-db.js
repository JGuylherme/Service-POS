const db = require('../utils/db');
const fs = require('fs');

const init = async () => {
  try {
    const schema = fs.readFileSync('./db/schema.sql', 'utf8');
    await db.query('USE service_pos_app');
    await db.query(schema);
    console.log('✅ Database schema applied successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to apply schema:', err.message);
    process.exit(1);
  }
};

init();
