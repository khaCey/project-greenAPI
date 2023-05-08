const mysql = require('mysql');

const dbConnect = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'greendatabase',
});

dbConnect.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

module.exports = dbConnect;
