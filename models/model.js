// SQL Super Class with generic query methods
const connection = require('../lib/connection');

// table is the desired table to interact with
// id is the Primary Id used in the table

// ADD A PROMISE LIBRARY TO THIS IN THE FUTURE
// this is the exact thing that causes callback hell

class Model {
  constructor() {
    // target table
    this.table = ''
    // primary id
    this.id = ''
    // id to check for duplicates
    this.check = ''
  }

  create = (column, value, callback) => {
    connection.query(`INSERT INTO ${this.table} (??) VALUES (?)`, [column, value], (error, results, fields) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, results)
      }
    })
  }

  findById =  (value, callback) => {
    connection.query(`SELECT * FROM ${this.table} WHERE ${this.id} = ?`, [value], function(error, results, fields) {
      if(error){
        callback(error)
      } else {
        callback(null, results);
      }
    })
  }

  findAll = (callback) => {
    connection.query(`SELECT * FROM ${this.table}`, function (error, results, fields) {
      if (error) {
        callback(error, null)
      } else {
        const r = results.map(item => {
          let outputObj = {}
          Object.keys(item).forEach(key => {
            outputObj[key] = item[key];
          })
          return outputObj;
        })
        callback(null, r)
      }
    })
  }

  deleteById = (id, callback) => {
    connection.query(`DELETE FROM ${this.table} WHERE ${this.id} = ?`, [id], function (error, results, fields) {
      if (error) {
        callback(error)
      } else {
        callback(null, results)
      }
    })
  }

  // takes a column and a value to search for
  findByAttribute =  (column ,value, callback) => {
    connection.query(`SELECT * FROM ${this.table} WHERE ${column} = ${value}`, function(error, results, fields) {
      if(error){
        callback(error)
      } else {
        callback(null, results);
      }
    })
  }

  // prevent duplicates
  // takes an id queries the database for that id and deletes anything it finds
  checkDuplicate = (id, callback) => {
    connection.query(`DELETE FROM ${this.table} WHERE ${this.check} = ?`, [id], (error, results) => {
      if(error){
        callback(error)
      }
    })
  }
}

module.exports = Model