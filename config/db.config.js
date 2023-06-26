const { Pool } = require('pg');
const util = require('util');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Get the connection string from Heroku Config Vars
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => console.log('Connected to database!'));

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;