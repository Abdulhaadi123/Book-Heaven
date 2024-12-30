const ReadingHistory = require('../models/readinghistory');

// Add a book to reading history
exports.addToReadingHistory = async (req, res) => {
    try {
        const { userId, bookId, startTime, endTime, pagesRead } = req.body;

        // Validate input data
        if (!userId || !bookId || !startTime || !endTime || pagesRead === undefined) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new reading history entry
        const newReadingHistory = new ReadingHistory({
            user: userId,  // Referencing the User model via the userId
            book: bookId,  // Referencing the Book model via the bookId
            startTime,
            endTime,
            pagesRead
        });

        // Save the reading history to the database
        await newReadingHistory.save();

        res.status(201).json({ message: 'Reading history added successfully', readingHistory: newReadingHistory });
    } catch (error) {
        console.error('Error adding reading history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get reading history for a user
// In readingHistoryController.js
// Your MongoDB model


exports.getReadingHistory = async (req, res) => {
    const { userId } = req.params;  // Get the user ID from params

    try {
        // Find the most recent reading history for the user and book
        const readingHistory = await ReadingHistory.findOne({ user: userId }).populate ("user").populate ("book")
            .sort({ endTime: -1 }) // Sort by end time in descending order to get the most recent history
            .limit(1);  // Only fetch the most recent record

        if (!readingHistory) {
            return res.status(404).json({ message: 'No reading history found' });
        }

        res.status(200).json(readingHistory);  // Return the most recent reading history
    } catch (error) {
        console.error('Error fetching reading history:', error);
        res.status(500).json({ message: 'Error fetching reading history', error: error.message });
    }
};

// Delete a reading history entry by ID
exports.deleteReadingHistoryEntry = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedEntry = await ReadingHistory.findByIdAndDelete(id);
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Reading history entry not found' });
        }

        res.json({ message: 'Entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting reading history entry:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Example controller for handling reading history
const saveReadingHistory = async (req, res) => {
    const { userId, bookId, page, startTime, endTime, pagesRead } = req.body;

    if (!userId || !bookId || !page) {
        return res.status(400).json({ error: 'Missing required data' });
    }

    try {
        // Assume that "ReadingHistory" is a model to save the reading history
        const readingHistory = new ReadingHistory({
            userId,
            bookId,
            page,
            startTime,
            endTime,
            pagesRead,
        });

        await readingHistory.save();
        return res.status(200).json({ message: 'Reading history saved', data: readingHistory });
    } catch (error) {
        console.error('Error saving reading history:', error);
        return res.status(500).json({ error: 'Error saving reading history' });
    }
};
