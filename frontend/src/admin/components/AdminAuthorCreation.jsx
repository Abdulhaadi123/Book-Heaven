import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';  // Assuming this component renders the table
import EditModal from '../../modals/EditModal';
import DeleteModal from '../../modals/DeleteModal';

const AdminAuthorCreation = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalType, setModalType] = useState(null);  // 'edit', 'create', 'delete'
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [authorDetails, setAuthorDetails] = useState({
    name: '',
    bio: '',
    authorPhoto: null,
  });
  const [token, setToken] = useState(localStorage.getItem('authToken'));  // Assuming token is stored in localStorage

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/authors');
        setAuthors(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch authors. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleEditAuthor = (author) => {
    setSelectedAuthor(author);
    setModalType('edit');
  };

  const handleDeleteAuthor = (author) => {
    setSelectedAuthor(author);
    setModalType('delete');
  };

  const handleCreateAuthor = () => {
    setSelectedAuthor(null); // Clear any selected author for creation
    setModalType('create');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/authors/${selectedAuthor._id}`);
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author._id !== selectedAuthor._id)
      );
      alert('Author deleted successfully!');
    } catch (err) {
      console.error(err);
      setError('Error deleting author. Please try again.');
    } finally {
      setModalType(null); // Close the modal
    }
  };
  const handleSubmit = async (formData, authorId = null) => {
    try {
      setLoading(true);
  
      const url = authorId
        ? `http://localhost:5000/api/authors/${authorId}` // Edit URL
        : 'http://localhost:5000/api/authors'; // Create URL
  
      const method = authorId ? 'put' : 'post';
  
      const response = await axios[method](url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (authorId) {
        // Update the author list for editing
        setAuthors((prevAuthors) =>
          prevAuthors.map((author) =>
            author._id === authorId ? response.data : author
          )
        );
        alert('Author updated successfully!');
      } else {
        // Add new author to the list for creation
        setAuthors((prevAuthors) => [...prevAuthors, response.data]);
        alert('Author created successfully!');
      }
  
      setAuthorDetails({ name: '', bio: '', authorPhoto: null }); // Clear form
    } catch (err) {
      console.error(err);
      setError(`Error ${authorId ? 'updating' : 'creating'} author. Please try again.`);
    } finally {
      setLoading(false);
      setModalType(null); // Close the modal
    }
  };
  
  const columns = [
    {
      accessorKey: 'authorPhoto',
      header: 'Photo',
      cell: (info) => (
        <img
          src={`http://localhost:5000/${info.getValue()}`}
          alt={info.row.original.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'bio',
      header: 'Bio',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditAuthor(info.row.original)}
            className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteAuthor(info.row.original)}
            className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="text-center text-xl min-h-screen flex items-center justify-center">
        Loading authors...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Authors Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <button
          onClick={handleCreateAuthor}
          className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition duration-300"
        >
          Create New Author
        </button>
      </div>
      <Table data={authors} columns={columns} />

      {/* Modals */}
      {modalType === 'edit' && (
        <EditModal
          author={selectedAuthor}
          handleSubmit={handleSubmit}
          setEditingAuthor={() => setModalType(null)} // Close modal
          isCreating={false}
        />
      )}

      {modalType === 'create' && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Author</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={authorDetails.name}
                  onChange={(e) => setAuthorDetails({ ...authorDetails, name: e.target.value })}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  value={authorDetails.bio}
                  onChange={(e) => setAuthorDetails({ ...authorDetails, bio: e.target.value })}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Author Photo</label>
                <input
                  type="file"
                  onChange={(e) => setAuthorDetails({ ...authorDetails, authorPhoto: e.target.files[0] })}
                  className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-4 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                  {loading ? 'Creating...' : 'Create Author'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalType === 'delete' && (
        <DeleteModal
          author={selectedAuthor}
          onClose={() => setModalType(null)} // Close modal
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default AdminAuthorCreation;
