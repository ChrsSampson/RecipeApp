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
router.post('/login', async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }
        if(user.verifyPassword(password)){
            req.session.user = {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                color: user.color,
                family: user.family,
                joined: user.joined
            }
            req.flash('success', 'You have successfully logged in');
            res.redirect('/app/dashboard');
        } else {
            req.flash('error', 'Invalid email or password');
            res.redirect('/login');
        }

    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/login')
    }
});

// logout a user and destory session
router.post('/logout', (req,res, next) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;