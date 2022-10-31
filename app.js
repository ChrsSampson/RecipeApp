const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

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
app.use(require('flash')());


// connection to db
require('./database/connection');


// routes
app.use('/', require('./routes/pages'));
app.use('/users', require('./routes/users'));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

