// In src/modals/category/CategoryDeleteModal.js
import React from 'react';

const CategoryDeleteModal = ({ categoryName, handleDelete, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
        {/* Modal Content */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Are you sure you want to delete the category?
        </h2>

        <p className="text-sm text-gray-700 mb-6">
          This action will permanently delete the category: <strong>{categoryName}</strong>
        </p>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
          >
            Delete Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryDeleteModal;
