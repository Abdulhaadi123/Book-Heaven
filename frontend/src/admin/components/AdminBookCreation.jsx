import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminBookCreation = () => {
  // State to manage form data
  const [bookDetails, setBookDetails] = useState({
    title: '',
    description: '',
    authorId: '',
    categoryId: '',
    coverImage: null,
    pdf: null,
  });

  // State for authors and categories
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  // State to manage loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch authors and categories from the backend
  useEffect(() => {
    const fetchAuthorsAndCategories = async () => {
      try {
        const authorsResponse = await axios.get('http://localhost:5000/api/authors');
        const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
        
        setAuthors(authorsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching authors or categories');
      }
    };

    fetchAuthorsAndCategories();
  }, []);

  // Handle file input changes (cover image and PDF)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'coverImage') {
      setBookDetails({ ...bookDetails, coverImage: files[0] });
    } else if (name === 'pdf') {
      setBookDetails({ ...bookDetails, pdf: files[0] });
    }
  };

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  // Handle dropdown change for author and category selection
  const handleDropdownChange = (e) => {
    const { name, value } = e.target;
    console.log(`Selected ${name}:`, value); // Debugging
    setBookDetails({ ...bookDetails, [name]: value });
  };

  // Form submission handler
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the selected author and category IDs
    console.log('Selected Author ID:', bookDetails.authorId);
    console.log('Selected Category ID:', bookDetails.categoryId);
  
    // Create FormData object to handle file uploads
    const formData = new FormData();
    formData.append('title', bookDetails.title);
    formData.append('authorId', bookDetails.authorId);
    formData.append('categoryId', bookDetails.categoryId);
    formData.append('description', bookDetails.description);
    formData.append('coverImage', bookDetails.coverImage);
    formData.append('pdf', bookDetails.pdf);
  
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token'); 
  
    try {
      setLoading(true);
      setError(''); // Reset error state
  
      // Send POST request to backend API with the token in the Authorization header
      const response = await axios.post('http://localhost:5000/api/books', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, 
          // Send token in Authorization header
        },
      });
  
      console.log(response.data); // Log response data
      // Handle success - you can redirect or show a success message
    } catch (err) {
      console.error(err);
      setError('Error creating book. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
      

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create New Book</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">Book Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={bookDetails.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={bookDetails.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="authorId" className="block text-sm font-semibold mb-2">Author</label>
          <select
            id="authorId"
            name="authorId"
            value={bookDetails.authorId}
            onChange={handleDropdownChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-sm font-semibold mb-2">Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={bookDetails.categoryId}
            onChange={handleDropdownChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="coverImage" className="block text-sm font-semibold mb-2">Cover Image</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="pdf" className="block text-sm font-semibold mb-2">PDF File</label>
          <input
            type="file"
            id="pdf"
            name="pdf"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-center mb-4">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? 'Submitting...' : 'Create Book'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminBookCreation;
