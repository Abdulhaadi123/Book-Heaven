const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig'); // Import multer configuration
const { createAuthor, getAllAuthors, getAuthorById, updateAuthor, deleteAuthor } = require('../controllers/authorController');

// Routes for creating and updating authors
router.post('/', upload.single('authorPhoto'), (req, res, next) => {
    console.log('Body:', req.body); // Logs form data (name, bio)
    console.log('File:', req.file); // Logs the uploaded file data
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    next();
}, createAuthor);

router.put('/:id', upload.single('authorPhoto'), (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).json({ message: req.fileValidationError });
    }
    next();
}, updateAuthor);

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.delete('/:id', deleteAuthor);

module.exports = router;
