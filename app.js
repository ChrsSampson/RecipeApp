const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
var cookieParser = require('cookie-parser');
const { rmSync } = require('fs');

// configure the app
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
// pubic folder
app.use(express.static(path.join(__dirname, 'public')));
// parsing middleware
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser('keyboard cat'))

// sessions
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));

// flash messages
app.use(flash());

app.use((req, res, next) => {
    res.locals.flash = {
        success: req.flash('success'),
        error: req.flash('error'),
        info: req.flash('info')
    }
    next();
})

// connection to db
require('./database/connection');


// routes
app.use('/', require('./routes/pages'));
app.use('/users', require('./routes/users'));


// error handler
app.use((err, req, res, next) => {
    if(err){
        console.error(err)
        res.status(500).send(err.message)
    } else {
        res.status(404).send('Page not found')
    }

})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

