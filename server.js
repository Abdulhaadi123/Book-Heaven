const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); 
const readingHistoryRoutes = require('./routes/readinghistoryRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes'); 
const path = require('path');
require('dotenv').config();
const upload = require('./middleware/multerConfig'); // Import multerConfig here

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdf.worker.min.mjs', express.static(path.join(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes); // Book routes
app.use('/api/categories', categoryRoutes); // Category routes
app.use('/api/readinghistory', readingHistoryRoutes); // Reading history routes
app.use('/api/authors', authorRoutes);  // Attach multer middleware for author photos
app.use('/api/bookmarks', bookmarkRoutes);

// New Route for Uploading PDFs
app.post('/api/books', upload.single('pdfFile'), async (req, res) => {
    const { title, description, authorId, categoryId } = req.body;

    // Check if a PDF file was uploaded
    const pdfFile = req.file ? req.file.path : null; // Get the uploaded file path

    try {
        const newBook = new Book({
            title,
            description,
            authorId,
            categoryId,
            pdfFile, // Save the path of the uploaded PDF
        });

        await newBook.save();
        res.status(201).json(newBook); // Respond with the created book
    } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
