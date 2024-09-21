const { Pool } = require('pg');

// Postgres connection pool
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;
