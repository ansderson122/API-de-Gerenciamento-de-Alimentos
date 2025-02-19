const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expirationDate: {
        type: Date,
        required: true
    },
    price:{
        type: Number,
        required: true
    }
});

const FoodSchema = mongoose.model('Food', foodSchema);

module.exports = FoodSchema;