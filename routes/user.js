const express = require('express');
const router = express.Router();

const user = require('../models/user');

// create
router.post('/create', async (req, res) => {
  const {username, password} = req.body;
  const results = await user.create(['username', 'password'], [username, password], (err, result) => {
    if(err){
      throw new Error(err)
    }
    console.log(result)
    res.json({"message": `Created ${username}`, "results": results});
  })
});

// find all
router.get('/', (req, res) => {
  const r = user.findAll((err, result) => {
    if (err) {
      throw new Error(err)
    }
    res.send(result)
  });
});

// find by id
router.get('/id/:id', async (req, res) => {
  const {id} = req.body
  const r = await user.findById(id, (err, result) => {
    if(err){
      throw new Error(err)
    }
    res.send(result)
  })
})

// find one by username
router.get('/username/:username', async (req, res) => {
  const {username} = req.body
  const r = await user.findByUsername(username, (err, result) => {
    if(err){
      throw new Error(err)
    }
    res.send(result)
  })
})

// delete
router.delete('/', (req, res) => {
  const {id} = req.body;
  user.deleteById(id, (err, result) => {
    if(err){
      throw new Error(err)
    } else {
      res.send(`deleted ${id}`)
    }

  })
})

module.exports = router;