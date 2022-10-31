// backend routes for users

const express = require('express');
const router = express.Router();
const verifyUserRegistration = require('../middleware/verifyUserRegistration');

const User = require('../database/models/userModel');

// register a user
router.post('/register', verifyUserRegistration, async (req,res, next) => {
    try{
        // create a new user
        const { firstName, lastName, email, password } = req.body;
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        await newUser.save()

        req.flash('success', 'You have successfully registered');
        res.redirect('/login')
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register')
    }
});


// login a user
router.post('/login', (req,res) => {
    res.send('hi')

});

module.exports = router;