const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Create a new category
router.post('/', categoryController.createCategory);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Get a category by ID
router.get('/:id', categoryController.getCategoryById);

// Update a category by ID
router.put('/:categoryId', categoryController.updateCategory);  // Corrected

// Delete a category by ID
router.delete('/:categoryId', categoryController.deleteCategory);  // Corrected

module.exports = router;
