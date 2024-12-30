const express = require('express');
const bookmarkController = require('../controllers/bookmarkController');
const router = express.Router();
// Route to create a new bookmark
router.post('/', bookmarkController.createBookmark);
// Route to get bookmarks for a specific user
router.get('/', bookmarkController.getBookmarks);
// Route to update a bookmark by its ID
router.put('/:id', bookmarkController.updateBookmark);
// Route to delete a bookmark by its ID
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
