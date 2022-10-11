const express = require('express');
const router = express.Router();
const sendRequest = require('../lib/sendRequest');
const parseIngredients = require('../lib/parseIngredients');
const recipe = require('../models/recipe');


router.get('/', (req, res,) => {
  recipe.findAll((error, result) => {
    if(error){
      throw new Error(error)
    } else {
      res.send(result);
    }
  })
})

// fetch a specific recipe from the database
// lookup my apiId
router.get('/:id', (req, res) => {
  const { id } = req.params;
  recipe.findByAttribute('apiId', id, (error, results) => {
    if (error) {
      throw new Error(error)
    }
    res.json(results)
  })
})

// get, cache, and return a random recipe
// sneaky way of adding to the database without making a huge amount requests and getting flaged ;)
router.get('/random/api', (req, res) => {
  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
  sendRequest(url)
  .then(result => {
    const data = result.data.meals[0]
    const ingredients = JSON.stringify(parseIngredients(data));
    const values = [data.idMeal, data.strMeal, data.strInstructions, data.strCategory, data.strArea, data.strSource, data.strTags, ingredients, data.strMealThumb];
    recipe.create(values, (err, r) => {
      if(err){
        console.log(err)
        // throw new Error(err)
      } else {
        // query the value we just created and send to the client
        recipe.findById(r.insertId, (err, r) => {
          res.send(r)
        })
      }
    })
  })
  .catch(err => {
    console.log(err)
  })
})

// allow the client query the api
router.post('/search', (req, res) => {
  const { url } = req.body
  sendRequest(url, 'GET')
    .then(result => {
      res.send(result.data.meals)
    })
})

// get a Id from the client
// query the api for that id
// save the result to the database - so we dont have to do it later
// send that parsed data back to the client
router.post('/search/:id', (req, res) => {
  const { id } = req.params;
  const url = `http://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  sendRequest(url)
  .then(result => {
    const data = result.data.meals[0]
    const ingredients = JSON.stringify(parseIngredients(data));
    const values = [data.idMeal, data.strMeal, data.strInstructions, data.strCategory, data.strArea, data.strSource, data.strTags, ingredients, data.strMealThumb];
    recipe.create(values, (err, r) => {
      if(err){
        throw new Error(err)
      } else {
        // query the value we just created and send to the client
        recipe.findById(r.insertId, (err, r) => {
          res.send(r)
        })
      }
    })
  })
  .catch(err => {
    console.log(err)
  })
})

module.exports = router
