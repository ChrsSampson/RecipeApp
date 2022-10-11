// manage the a users liked recipes
const Model = require('./model');
const connection = require('../lib/connection');

class Like extends Model{
  constructor() {
    super()
    this.table = 'likes'
    // use user id as primaryId because I think thats what will be used the most
    this.id = 'userId'
  }

  // takes two arrays in order
  // userId, recipeId (not apiId)
  create = (columns, values, callback) => {
    connection.query(`INSERT INTO ${this.table} (??, ??) VALUES (?,?)  `, [ columns[0], columns[1], values[0], values[1] ], (error, results, fields) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, results)
      }
    })
  }

  // takes to arrays in order
  findSpecific = (columns, values, callback) => {
    connection.query(`SELECT * FROM ${this.table} WHERE ?? = ? AND ?? = ?`, [ columns[0], values[0], columns[1], values[1] ], (err, results, fields) => {
      if(err){
        callback(err, null)
      } else {
        console.log(results)
        callback(null, results)
      }
    })
  }

  deleteSpecific = (columns, values, callback) => {
    connection.query(`DELETE FROM ${this.table} WHERE ?? = ? AND ?? = ?`, [columns[0], values[0], columns[1], values[1]], (err, results, fields) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, results)
      }
    })
  }


}

const like = new Like()

module.exports = like