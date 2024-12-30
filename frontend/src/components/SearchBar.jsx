import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Trigger search if the query is not empty
    if (query.trim() === '') {
      // Reset search and show all books when input is cleared
      handleSearch(''); 
    } else {
      handleSearch(query.trim()); // Trigger search with trimmed query
    }
  };

  return (
    <div className="relative mb-4 max-w-sm mx-auto">
      <input
        type="text"
        placeholder="Search by title or category..."
        value={searchQuery}
        onChange={handleInputChange}
        className="w-full p-3 pl-10 pr-4 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md text-sm"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
