import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table'; // Make sure to import your Table component

// Corrected imports for the modals inside the books folder
import BookEditModal from '../../modals/books/BookEditModal'; // Updated import for BookEditModal
import BookDeleteModal from '../../modals/books/BookDeleteModal'; // Updated import for BookDeleteModal


const ManageBook = () => {
  



const fetchData = async () => {
  try {
    setLoading(true);
    const [bookRes, authorRes, categoryRes] = await Promise.all([
      axios.get('http://localhost:5000/api/books'),
      axios.get('http://localhost:5000/api/authors'),
      axios.get('http://localhost:5000/api/categories'),
    ]);
    
    const authors = authorRes.data;
    const categories = categoryRes.data;
    
    // Join books with authors and categories
    const booksWithDetails = bookRes.data.map((book) => {
      // Find the author and category names based on IDs
      const author = authors.find((author) => author._id === book.authorId);
      const category = categories.find((category) => category._id === book.categoryId);

      return {
        ...book,
        authorName: author?.name || 'Unknown Author',
        categoryName: category?.name || 'Unknown Category',
      };
    });
    
    setBooks(booksWithDetails);
    setAuthors(authors);
    setCategories(categories);
  } catch (err) {
    console.error('Error fetching data:', err);
    setError('Error fetching data. Please try again.');
  } finally {
    setLoading(false);
  }
};


  if (loading) {
    return <div>Loading...</div>;
  }

  const columns = [
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Author',
      accessorKey: 'authorName', // Use the populated authorName
    },
    {
      header: 'Category',
      accessorKey: 'categoryName', // Use the populated categoryName
    },
    {
      header: 'Actions',
      cell: (info) => (
        <div>
          <button onClick={() => handleEditBook(info.row.original)} className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Edit
          </button>
          <button onClick={() => handleDeleteBook(info.row.original._id)} className="bg-red-600 text-white px-4 py-2 rounded-md ml-2">
            Delete
          </button>
        </div>
      ),
    },
  ];
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Manage Books</h1>

      {/* Edit Modal */}
      {editingBook && (
        <BookEditModal
          book={editingBook}
          bookDetails={bookDetails}
          handleSubmit={() => {
            // Call your save logic here
            setEditingBook(null);
          }}
          setBookDetails={setBookDetails}
          onClose={() => setEditingBook(null)}
          isCreating={false}
        />
      )}

      {/* Delete Modal */}
      {deletingBookId && (
        <BookDeleteModal
          bookName={books.find(book => book._id === deletingBookId)?.title} // Get the book title safely
          handleDelete={confirmDeleteBook}
          onClose={() => setDeletingBookId(null)}
        />
      )}

      {/* Table to Display Books */}
      <Table data={books} columns={columns} />
    </div>
  );
};

export default ManageBook;

