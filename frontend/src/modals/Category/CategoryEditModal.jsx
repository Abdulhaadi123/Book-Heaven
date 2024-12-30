// In src/modals/category/CategoryEditModal.js
import React, { useState, useEffect } from 'react';

const CategoryEditModal = ({
  category, // If editing, pass the category, else pass null
  categoryDetails,
  handleSubmit,
  setCategoryDetails,
  onClose,
  isCreating,
}) => {
  useEffect(() => {
    if (category) {
      setCategoryDetails({
        name: category.name,
        description: category.description,
      });
    }
  }, [category, setCategoryDetails]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
     
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96"> {/* Modal Content */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              id="name"
              value={categoryDetails.name}
              onChange={(e) =>
                setCategoryDetails({ ...categoryDetails, name: e.target.value })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Category Description</label>
            <input
              type="text"
              id="description"
              value={categoryDetails.description}
              onChange={(e) =>
                setCategoryDetails({
                  ...categoryDetails,
                  description: e.target.value,
                })
              }
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category description"
            />
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
              {isCreating ? 'Create Category' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryEditModal;
