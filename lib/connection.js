// sql database conneciton
const mysql = require('mysql')
const config = require('../config')

const connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: 'recipes'
})

connection.connect(function(err) {
  if (err) {
    return console.error('Connection Error: ' + err.message);
  }
  console.log('Connected to the MySQL 🎉');
});

module.exports = connection;