// login routes for users
const express = require('express')
const router = express.Router()

const user = require('../models/user')

// login a user
router.post('/', (req,res) => {
  const {username, password} = req.body
   user.findByUsername(username, (err, result) => {
    if(err){
      throw new Error(err)
    }
     // I did not use the streaming rows propety so now this
    //  no time to fix it right now so embrace the jank
    const data = result[0]
    // plain text passwords make this easy
    if(data.password === password){
      res.json({result: true, data})
    } else {
      res.json({result: false})
    }

  })
})


module.exports = router