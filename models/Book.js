const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: false,  // Ensure the coverImage is required
    },
    pdf: {
        type: String,
        required: false,  // Ensure the PDF is required
    },
});

module.exports = mongoose.model('Book', BookSchema);
