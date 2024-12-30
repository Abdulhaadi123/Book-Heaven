import React, { useState, useEffect } from 'react';

const BookEditModal = ({ book, handleSubmit, onClose, authors, categories }) => {
  const [bookDetails, setBookDetails] = useState({
    title: '',
    authorName: '',
    categoryName: '',
    coverImage: null,
    pdf: null,
  });

  useEffect(() => {
    if (book) {
      setBookDetails({
        title: book.title,
        authorName: book.authorId?.name || '',
        categoryName: book.categoryId?.name || '',
        coverImage: book.coverImage || null,
        pdf: book.pdf || null,
      });
    }
  }, [book]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: files[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({
      ...bookDetails,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    handleSubmit(bookDetails);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={bookDetails.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book title"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">Author</label>
            <select
              id="authorName"
              name="authorName"
              value={bookDetails.authorName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {authors && authors.length > 0 ? (
                authors.map((author) => (
                  <option key={author._id} value={author.name}>
                    {author.name}
                  </option>
                ))
              ) : (
                <option value="">No authors available</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="categoryName"
              name="categoryName"
              value={bookDetails.categoryName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="">No categories available</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Cover Image</label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {bookDetails.coverImage && bookDetails.coverImage instanceof Blob && (
              <img
                src={URL.createObjectURL(bookDetails.coverImage)}
                alt="Cover Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="pdf" className="block text-sm font-medium text-gray-700">PDF</label>
            <input
              type="file"
              id="pdf"
              name="pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            />
            {bookDetails.pdf && bookDetails.pdf instanceof Blob && (
              <div className="mt-2 text-sm text-gray-500">
                {bookDetails.pdf.name}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEditModal;
