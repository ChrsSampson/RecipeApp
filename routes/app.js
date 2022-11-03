// contains the routes for pages that require authentication and a session

const express = require('express');
const router = express.Router();

// this whole router is protected by isAuthed and userSessionParser

// app dashboard page
router.get('/dashboard', (req,res,next) => {
    res.locals.title = 'Dashboard';
    res.render('pages/app/dashboard.pug');
})


module.exports = router

