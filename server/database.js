const mysql = require('mysql');

const db = mysql.createPool({
  host: '42.192.140.201',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'blog'
});

// db.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log('mysql is connect...');
// })

module.exports = db;