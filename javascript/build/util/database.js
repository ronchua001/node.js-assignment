"use strict";

var mysql = require('mysql2'); //create pool using database details


var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'school-administration-system',
  password: 'password'
});
module.exports = pool.promise();