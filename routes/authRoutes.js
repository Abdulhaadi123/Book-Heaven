const express = require('express');
const { register, login } = require('../controllers/authController'); // Update the path if necessary
const authMiddleware = require('../middleware/authMiddleware'); // Import the auth middleware
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route for Plash component - requires authentication
router.get('/plash', authMiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

// Admin-only route - requires admin role
router.get('/admin', authMiddleware, (req, res, next) => {
    // Check if the user has admin role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    res.json({ message: 'This is an admin-only route', user: req.user });
});
router.post('/books', authMiddleware, async (req, res) => {
    try {
        const { title, description, authorId, categoryId, coverImage, pdf } = req.body;
        
        // Logic to create a new book
        const newBook = new Book({
            title,
            description,
            authorId,
            categoryId,
            coverImage,
            pdf,
        });

        await newBook.save();
        res.status(201).json({ message: 'Book created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
