// recipe mongoose model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: Array,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    family: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);