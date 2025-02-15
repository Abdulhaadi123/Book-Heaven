// models/category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
