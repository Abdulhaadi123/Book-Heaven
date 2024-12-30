const Author = require('../models/author');
const path = require('path');

// Create a new author

exports.createAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const authorPhoto = req.file ? req.file.path : null;

        const newAuthor = await Author.create({ name, bio, authorPhoto });
        res.status(201).json(newAuthor);
    } catch (error) {
        console.error('Error creating author:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};





// Get all authors
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get author by ID
exports.getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update author details
exports.updateAuthor = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const authorPhoto = req.file ? req.file.path : undefined; // Get the new image path if uploaded

    if (authorPhoto) {
        updates.authorPhoto = authorPhoto; // Update the authorPhoto field
    }

    try {
        const author = await Author.findByIdAndUpdate(id, updates, { new: true });
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author updated successfully', author });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete author
exports.deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const author = await Author.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
