const mysql = require('mysql');

const dbConnect = mysql.createPool({
  connectionLimit: 10,
  host: 'db5012880865.hosting-data.io',
  user: 'dbu5684100',
  password: '!Oliachan123',
  database: 'dbs10818198',
});

module.exports = dbConnect;
