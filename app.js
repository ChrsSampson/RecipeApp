const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('flash');

// configure the app
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
// pubic folder
app.use(express.static(path.join(__dirname, 'public')));

// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

// parsing middleware
app.use(express.urlencoded({ extended: true })); 

// flash messages
app.use(flash());
// Make these pieces of data availible on every request (if they exist)
app.use((req, res, next) => {
    // Currently logged in user
    res.locals.currentUser = req.user;
    // Flash messages
    res.locals.info = req.flash('info');
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next()
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

