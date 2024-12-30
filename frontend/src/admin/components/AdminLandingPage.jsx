import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from react-router-dom
import { FaBook, FaUser, FaTags, FaCogs, FaBars } from 'react-icons/fa';
import Modal from '../../modals/Modal'; // Import modal component
import ManageBook from './ManageBook';

import AdminCategoryCreation from './AdminCategoryCreation';
import AdminAuthorCreation from './AdminAuthorCreation'; // Correct import

const Sidebar = ({ isOpen }) => {
  const [animals, setAnimals] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [books, setBooks] = useState([]);

  const [isBooksDropdownOpen, setIsBooksDropdownOpen] = useState(false);
  const [isAuthorsDropdownOpen, setIsAuthorsDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/authors')
      .then(response => response.json())
      .then(data => setAuthors(data))
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const toggleBooksDropdown = () => setIsBooksDropdownOpen(prev => !prev);
  const toggleAuthorsDropdown = () => setIsAuthorsDropdownOpen(prev => !prev);
  const toggleCategoriesDropdown = () => setIsCategoriesDropdownOpen(prev => !prev);

  return (
    <div className={`w-64 h-full bg-gray-800 text-white p-6 fixed top-0 left-0 transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-300">Admin Dashboard</h2>
      <ul className="space-y-4">
        {/* Manage Books Dropdown */}
        <li>
          <button className="w-full text-left py-3 px-4 mb-4 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-start">
            <FaBook className="inline mr-3 text-lg" /> Books
          </button>
          {isBooksDropdownOpen && (
            <ul className="pl-6 space-y-2 bg-blue-500 rounded-lg">
              {books.map((book, index) => (
                <li key={index}>
                  <button className="text-white py-2 px-4 w-full text-left hover:bg-blue-700">{book.title}</button>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Manage Authors Dropdown */}
        <li>
          <button className="w-full text-left py-3 px-4 mb-4 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-start">
            <FaUser className="inline mr-3 text-lg" /> Authors
          </button>
          {isAuthorsDropdownOpen && (
            <ul className="pl-6 space-y-2 bg-green-500 rounded-lg">
              {authors.map((author, index) => (
                <li key={index}>
                  <button className="text-white py-2 px-4 w-full text-left hover:bg-green-700">{author.name}</button>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Manage Categories Dropdown */}
        <li>
          <button className="w-full text-left py-3 px-4 mb-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg flex items-center justify-start">
            <FaTags className="inline mr-3 text-lg" /> Categories
          </button>
          {isCategoriesDropdownOpen && (
            <ul className="pl-6 space-y-2 bg-yellow-500 rounded-lg">
              {categories.map((category, index) => (
                <li key={index}>
                  <button className="text-white py-2 px-4 w-full text-left hover:bg-yellow-700">{category.name}</button>
                </li>
              ))}
            </ul>
          )}
        </li>

        {/* Settings Button */}
        <li>
          <button className="w-full text-left py-3 px-4 mb-4 bg-gray-700 hover:bg-gray-800 rounded-lg flex items-center justify-start">
            <FaCogs className="inline mr-3 text-lg" /> Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

// Navbar Component
const Navbar = ({ onLogout, onToggleSidebar }) => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <button onClick={onToggleSidebar} className="text-white text-3xl">
        <FaBars />
      </button>
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <button
        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
        onClick={onLogout}
      >
        Logout
      </button>
    </div>
  );
};

const AdminLandingPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // Sidebar visibility state
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login'; // Redirect to login page
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);  // Toggle sidebar visibility
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 h-full bg-gray-100 p-8 ml-64 transition-all duration-300 ease-in-out">
        {/* Navbar */}
        <Navbar onLogout={handleLogout} onToggleSidebar={toggleSidebar} />

        {/* Main Content Area */}
        <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-6 h-full mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Cards */}
            <div className="bg-blue-500 rounded-lg p-6 text-white text-center shadow-lg h-80 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-blue-400">
              <h2 className="text-2xl font-semibold mb-4">Create Book</h2>
              <p className="mb-4">Add new books to your library</p>
              <button
                className="bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-200 transition duration-300"
                onClick={() => navigate('/book-creation')} // Navigate to Book Creation page
              >
                Create Book
              </button>
            </div>

            <div className="bg-gray-500 rounded-lg p-6 text-white text-center shadow-lg h-80 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-gray-400">
              <h2 className="text-2xl font-semibold mb-4">Manage Book</h2>
              <p className="mb-4">View and manage your existing books</p>
              <button
                className="bg-white text-gray-500 py-2 px-4 rounded-lg hover:bg-gray-200 transition duration-300"
                onClick={() => navigate('/manage-books')} // Navigate to Manage Books page
              >
                Manage Books
              </button>
            </div>

            <div className="bg-green-500 rounded-lg p-6 text-white text-center shadow-lg h-80 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-green-400">
              <h2 className="text-2xl font-semibold mb-4">Create Author</h2>
              <p className="mb-4">Add new authors to your library</p>
              <button
                className="bg-white text-green-500 py-2 px-4 rounded-lg hover:bg-green-200 transition duration-300"
                onClick={() => navigate('/author-creation')} // Navigate to Author Creation page
              >
                Create Author
              </button>
            </div>

            <div className="bg-yellow-500 rounded-lg p-6 text-white text-center shadow-lg h-80 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400">
              <h2 className="text-2xl font-semibold mb-4">Create Category</h2>
              <p className="mb-4">Add new categories to organize your books</p>
              <button
                className="bg-white text-yellow-500 py-2 px-4 rounded-lg hover:bg-yellow-200 transition duration-300"
                onClick={() => navigate('/category-creation')} // Navigate to Category Creation page
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLandingPage;
