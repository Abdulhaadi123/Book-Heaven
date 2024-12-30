import React from 'react';

const CategoryDropdown = ({ categories, selectedCategory, handleCategoryChange }) => (
  <div className="mb-4">
    <label htmlFor="category-select" className="block mb-1 text-sm font-medium text-gray-700">Select Category</label>
    <select
      id="category-select"
      value={selectedCategory}
      onChange={handleCategoryChange}
      className="p-2 rounded border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Categories</option>
      {categories.length === 0 ? (
        <option disabled>No categories available</option>
      ) : (
        categories.map((category) => (
          <option key={category._id} value={category._id}>{category.name}</option>
        ))
      )}
    </select>
  </div>
);

export default CategoryDropdown;
