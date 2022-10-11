// manage the relationship between a user and recipes

const express = require('express')
const router = express.Router();

const like = require('../models/likes');

// a user liked a recipe and provided 2 Ids
router.post('/', (req, res) => {
  const {userId, recipeId} = req.body
  like.create(['userId', 'recipeId'], [userId, recipeId], (err, results) => {
    if(err){
      console.log(err)
      throw new Error(err)
    }
    res.send('success')
  })
})

// delete a like
router.post('/unlike', (req, res) => {
  const {userId, recipeId} = req.body
  like.deleteSpecific(['userId', 'recipeId'], [userId, recipeId], (err, results) => {
    if(err){
      throw new Error(err)
    }
    res.send('success')
  })
})

router.post('/find', (req ,res) => {
  const {userId, recipeId} = req.body;
  like.findSpecific(['userId', 'recipeId'], [userId, recipeId], (error, results) => {
    if(error){
      throw new Error(error)
    }
    res.json(results);
  })
})

// get all of users like recipes
router.post('/findAll', (req, res) => {
  const { userId } = req.body;
  like.findById(userId, (error, results) => {
    if (error) {
      throw new Error(error)
    }
    res.json(results)
  })
})

module.exports = router;