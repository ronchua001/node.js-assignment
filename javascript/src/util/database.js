const mysql = require('mysql2');

//create pool using database details

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'school-administration-system',
  password: 'password',
  port: 33306
})


module.exports = pool.promise();
