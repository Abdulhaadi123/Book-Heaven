import React from 'react';

const Modal = ({ children, onClose, title, handleEdit, handleDelete, category }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-[90%] sm:max-w-[80%] top-18 md:max-w-[60%] lg:max-w-[50%] ">
        <button
          className="text-red-500 hover:text-red-700 focus:outline-none absolute top-20 -ml-3.5 text-2xl bg-transparent rounded-full p-2 transition-all duration-200 ease-in-out"
          onClick={onClose}
        >
          &times;
        </button>
        {title && <h2 className="text-xl font-semibold ">{title}</h2>}
        {children}

        
      </div>
    </div>
  );
};

export default Modal;
