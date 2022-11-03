// this file contains all the routes for the pages that do note require authentication
const express = require('express');
const router = express.Router();

// index page
router.get('/', (req, res) => {
    res.locals.title = 'Home';
    res.render('pages/index.pug')
});

// login page
router.get('/login', (req, res) => {
    res.locals.title = 'Login';
    res.locals.form = {
        formMethod: 'POST',
        formAction: '/users/login',
    }
    res.render('pages/login.pug')
})

router.get('/register', (req, res) => {
    res.locals.title = 'Register';
    res.locals.form = {
        formMethod: 'POST',
        formAction: '/users/register',
    }
    res.render('pages/register.pug')
});


module.exports = router