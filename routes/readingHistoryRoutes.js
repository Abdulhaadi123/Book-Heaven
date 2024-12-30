const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const ReadingHistory = require('../models/readinghistory');
const { getReadingHistory } = require('../controllers/readingHistoryController'); // Correct import for getReadingHistory

// Save reading history
router.post('/', authMiddleware, async (req, res) => {
    const { bookId, page, startTime, endTime, pagesRead } = req.body;
    const userId = req.user.id; // Assuming user ID is set after authentication

    if (!bookId || !startTime || !endTime || !pagesRead || page === undefined) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        // Save reading history in the database
        const readingHistory = new ReadingHistory({
            user: userId,          // User ID from the authenticated request
            book: bookId,          // Book ID
            pageNumber: page,      // Page number
            startTime,             // Start time of the reading
            endTime,               // End time of the reading
            pagesRead,             // Number of pages read
        });

        const savedReadingHistory = await readingHistory.save();
        res.status(201).json(savedReadingHistory);
    } catch (error) {
        console.error('Error saving reading history:', error);
        res.status(500).json({ message: 'Error saving reading history', error: error.message });
    }
});

// Fetch reading history for a specific user
router.get('/:userId', authMiddleware,getReadingHistory);

module.exports = router;
