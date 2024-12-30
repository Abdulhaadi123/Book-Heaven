const express = require('express');
const router = express.Router();
const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');  // Import the auth middleware

// Multer file upload configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Destination folder for uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  // Create a unique filename
    }
});

const upload = multer({ storage: storage });

// Route to get all books or search by title (No authentication needed)
router.get('/', getAllBooks);

// Route to create a new book with coverImage and pdf file uploads (Protected route)
router.post('/', authMiddleware, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), createBook);

// Route to update a book (Protected route)
router.put('/:bookId', authMiddleware, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), updateBook);

// Route to delete a book (Protected route)
router.delete('/:bookId', authMiddleware, deleteBook);

module.exports = router;
