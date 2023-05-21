const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const pool = mysql.createPool({
  connectionLimit : 10,  //default value is 10
  host:     process.env.host,
  user:     process.env.user,
  password: process.env.password,
  database: process.env.database,
});

pool.on('connection', () => console.log('Connected to database!'));

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query);

module.exports = pool;
