const Bookmark = require('../models/bookmark');

// Create a new bookmark
exports.createBookmark = async (req, res) => {
    try {
        const { userId, bookId, page } = req.body;

        // Validate input fields
        if (!userId || !bookId || !page) {
            return res.status(400).json({ message: 'Missing required fields: userId, bookId, and page' });
        }

        // Create and save the new bookmark
        const newBookmark = new Bookmark({ userId, bookId, page });
        await newBookmark.save();
        res.status(201).json(newBookmark);
    } catch (err) {
        if (err.code === 11000) { // Duplicate error due to unique index
            res.status(400).json({ message: 'Bookmark already exists for this user and book' });
        } else {
            res.status(500).json({ message: 'Error creating bookmark', error: err.message });
        }
    }
};

// Get all bookmarks for a specific user
exports.getBookmarks = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Populate bookId field with the full book object, not just title
        const bookmarks = await Bookmark.find({ userId })
            .populate('bookId', '_id title'); // Populate bookId with _id and title
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookmarks', error });
    }
};


// Update a bookmark by its ID
exports.updateBookmark = async (req, res) => {
    try {
        const { id } = req.params;
        const { page } = req.body;

        // Validate input fields
        if (!id || !page) {
            return res.status(400).json({ message: 'Bookmark ID and page number are required' });
        }

        // Find the bookmark and update the page
        const updatedBookmark = await Bookmark.findByIdAndUpdate(
            id,
            { page },
            { new: true } // Returns the updated document
        );

        if (!updatedBookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        res.status(200).json(updatedBookmark);
    } catch (error) {
        res.status(500).json({ message: 'Error updating bookmark', error });
    }
};

// Delete a bookmark by its ID
exports.deleteBookmark = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Bookmark ID is required' });
        }

        const bookmark = await Bookmark.findByIdAndDelete(id);

        if (!bookmark) {
            return res.status(404).json({ message: 'Bookmark not found' });
        }

        res.status(200).json({ message: 'Bookmark deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting bookmark', error });
    }
};
