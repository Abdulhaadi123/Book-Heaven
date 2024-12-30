const mongoose = require('mongoose');

const readingHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Updated to 'user' to match controller
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },  // Updated to 'book' to match controller
    pageNumber: { type: Number, required: true },  // Keep as 'pageNumber' if you're tracking page number specifically
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    pagesRead: { type: Number, required: true },
});

const ReadingHistory = mongoose.model('ReadingHistory', readingHistorySchema);

module.exports = ReadingHistory;
