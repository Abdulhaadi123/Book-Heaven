import React from 'react';

const BookDeleteModal = ({ bookName, handleDelete, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Delete Book</h2>
        <p>Are you sure you want to delete the book titled <strong>{bookName}</strong>?</p>
        <div className="mt-4 flex justify-end space-x-4">
          <button 
            onClick={onClose} 
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={handleDelete} 
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDeleteModal;
