// users mongoose model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    family: {
        type: String,
        required: false,
        default: null
    },
    color: {
        type: String,
        required: true,
        default: '#' + Math.floor(Math.random()*16777215).toString(16)
    },
    password: {
        type: String,
        required: true
    },
    joined: {
        type: Date,
        default: Date.now
    }
});

// hash the password before saving the user and generate a random color
userSchema.pre('save', function(next) {
    const user = this;
    const SALT_FACTOR = 10;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// verify a password vs one that is stored in the db
userSchema.methods.verifyPassword = async function(plainText) {
    return await bcrypt.compare(plainText, this.password);
}

module.exports = mongoose.model('User', userSchema);