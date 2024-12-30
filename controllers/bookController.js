const Book = require('../models/Book');
const { v4: uuidv4 } = require('uuid'); // Import uuid for unique IDs

// Get all books or search books by title
exports.getAllBooks = async (req, res) => {
    const searchQuery = req.query.q;

    try {
        let books;
        if (searchQuery) {
            books = await Book.find({ title: { $regex: searchQuery, $options: 'i' } })
                .populate('authorId categoryId');
        } else {
            books = await Book.find().populate('authorId categoryId');
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    try {
        const { title, authorId, categoryId, description } = req.body;

        // Check if files are uploaded
        if (!req.files || !req.files['coverImage'] || !req.files['pdf']) {
            return res.status(400).json({ message: 'Both coverImage and pdf files are required.' });
        }

        // Extract file paths from the uploaded files
        const coverImage = req.files['coverImage'][0].path; // Path to the uploaded cover image
        const pdf = req.files['pdf'][0].path; // Path to the uploaded PDF file

        // Create a new book object
        const newBook = new Book({
            bookId: uuidv4(),  // Assuming uuidv4 is imported to generate a unique book ID
            title,
            authorId,
            categoryId,
            description,
            coverImage, // Save cover image file path
            pdf, // Save PDF file path
        });

        // Save the new book to the database
        await newBook.save();

        // Respond with the newly created book
        res.status(201).json(newBook);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: error.message }); // Return error message
    }
};

// bookController.js



// Update book details




exports.updateBook = async (req, res) => {
  const { bookId } = req.params;
  const { title, authorId, categoryId } = req.body;
  const coverImage = req.files?.coverImage ? req.files.coverImage[0].path : null;
  const pdf = req.files?.pdf ? req.files.pdf[0].path : null;

  try {
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    // Delete old files if new ones are uploaded
    if (coverImage && book.coverImage) {
      fs.unlink(path.join(__dirname, '../', book.coverImage), (err) => {
        if (err) console.error('Error deleting old cover image:', err);
      });
    }

    if (pdf && book.pdf) {
      fs.unlink(path.join(__dirname, '../', book.pdf), (err) => {
        if (err) console.error('Error deleting old PDF:', err);
      });
    }

    // Update book fields
    book.title = title;
    book.authorId = authorId;
    book.categoryId = categoryId;
    if (coverImage) book.coverImage = coverImage;
    if (pdf) book.pdf = pdf;

    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err });
  }
};



// Delete a book
exports.deleteBook = async (req, res) => {
    const { bookId } = req.params;

    try {
        // If 'bookId' is a custom ID, use it directly. If not, switch to '_id'
        const deletedBook = await Book.findOneAndDelete({ bookId }); // Replace with `{ _id: bookId }` if needed

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
