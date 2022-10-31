// connect to mongoose database

const mongoose = require('mongoose');

module.exports = (async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/express-mongo', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to database');
    } catch (error) {
        console.log('Error connecting to database');
    }
})();


