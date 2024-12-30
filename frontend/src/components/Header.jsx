import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const token = localStorage.getItem('token'); // Check if a user is logged in

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Book Reading App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/home" className="text-gray-300 hover:text-white">Home</Link></li>
            <li><Link to="/about" className="text-gray-300 hover:text-white">About</Link></li>
            <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            {token && (
              <li>
                <button 
                  onClick={handleLogout} 
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                </button>
              </li>
            )}
            {!token && (
              <li><Link to="/login" className="text-gray-300 hover:text-white">Login</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default Header;
