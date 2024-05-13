const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'owen',
  host: 'localhost',
  port: 5432,
  database: 'tasktracker'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
