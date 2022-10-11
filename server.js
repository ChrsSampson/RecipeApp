const express = require('express');
const path = require('path');
const megan = require('./lib/megan');
const config = require('./config');
const session = require('express-session');

const app = express();

app.use(express.json());

// Logger
app.use(megan);

// serve the client
app.use(express.static(path.join(__dirname + '/client/dist')));
// client sub routes are begin routed incorrectly
// if a the page is not refreshed there is not a problem
app.get('/client/*', (req, res) => {
  res.redirect('/')
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.use('/user', require('./routes/user') );
app.use('/recipe', require('./routes/recipes') );
app.use('/login', require('./routes/login') );
app.use('/like', require('./routes/like') );

app.listen(config.port, () => {
  console.log('server running')
});