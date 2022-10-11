// User Model
const Model = require('./model');
const connection = require('../lib/connection');
// user specific database quereies go here

class User extends Model {
  constructor() {
    super()
    this.table = 'users'
    this.id = 'userId'
    this.check = 'userId'
  }

  // takes two arrays in order
  create = (columns, values, callback) => {
    connection.query(`INSERT INTO ${this.table} (??, ??) VALUES (?, ?)`, [ columns[0],columns[1], values[0], values[1] ], (error, results, fields) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, results)
      }
    })
  }

  // same as find by id but uses username as query instead
  findByUsername =  (value, callback) => {
    connection.query(`SELECT * FROM ${this.table} WHERE username = ?`, [value], function(error, results, fields) {
      if(error){
        callback(error)
      } else {
        callback(null, results);
      }
    })
  }

}

const user = new User();

module.exports = user;