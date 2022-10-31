// backend routes for users

const express = require('express');
const router = express.Router();
const verifyUserRegistration = require('../middleware/verifyUserRegistration');

// register a user
router.post('/register', verifyUserRegistration, (req,res) => {
    res.send('hi')

});


// login a user
router.post('/login', (req,res) => {
    res.send('hi')

});

module.exports = router;