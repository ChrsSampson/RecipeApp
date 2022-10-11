// recipe model
const connection = require('../lib/connection');
const Model = require('./model');

class Recipe extends Model{
  constructor(){
    super()
    // what is this spelling man
    this.table = 'reciepes'
    this.id = 'recipeId'
    this.check = 'apiId'
  }

  // recipes have many more requirements to be created so this method  is going to need to be changed
  // value is an array
  create = (value, callback) => {
    this.checkDuplicate(value[0])
    const columns = ['apiId', 'title', 'instructions', 'category', 'area', 'source', 'tags', 'ingredients', 'image']
    connection.query(`INSERT INTO ${this.table} (??) VALUES (?)`, [columns , value], (error, results, fields) => {
      if (error) {
        callback(error, null)
      } else {
        callback(null, results)
      }
    })
  }

}

const recipe = new Recipe()

module.exports = recipe;
