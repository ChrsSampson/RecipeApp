// this file contains all the routes for the pages
const path = require('path');
const express = require('express');
const router = express.Router();

// index page
router.get('/', (req, res) => {
    res.locals = {
        title: 'Home'
    }
    res.render('pages/index.pug')
});

// login page
router.get('/login', (req, res) => {
    req.flash={
        message: 'hello',
        type:"info"
    }
    res.locals = {
        title: 'Login',
        formMethod: 'POST',
        formAction: '/users/login'
    }
    res.render('pages/login.pug')
})

router.get('/register', (req, res) => {
    res.locals = {
        title: 'Register',
        formMethod: 'POST',
        formAction: '/users/register'
    }
    res.render('pages/register.pug')
});


module.exports = router