const DeleteModal = ({ author, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Delete Author</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{author.name}</strong>? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 py-1 px-4 rounded">
            Cancel
          </button>
          <button
            onClick={onDelete}  // Make sure this triggers the delete function
            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;