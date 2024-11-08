const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'local',
  user: 'root', // Reemplaza con tu usuario de MySQL
  password: '', // Reemplaza con tu contraseña de MySQL
  database: 'task',
  port: 3306 
});

module.exports = pool;