const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book' // Reference to the Book model
    },
    page: {
        type: Number,
        required: true,
        min: [1, 'Page number must be at least 1'],
        validate: {
            validator: Number.isInteger,
            message: 'Page number must be an integer'
        }
    }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// Add an index for faster querying by userId and bookId, ensuring unique bookmarks per user per book
bookmarkSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
