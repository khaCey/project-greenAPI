const mysql = require('mysql');

const dbConnect = mysql.createConnection({
  host: '34.146.1.231',
  user: 'khacey',
  password: '!Oliachan123',
  database: 'greendatabase',
  socketPath: '/cloudsql/quantum-chemist-385603:asia-northeast1:green-api',
});

dbConnect.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

module.exports = dbConnect;
