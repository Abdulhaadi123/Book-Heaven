import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table'; // Assuming this component renders the table
import CategoryEditModal from '../../modals/category/CategoryEditModal'; // Updated import
import CategoryDeleteModal from '../../modals/category/CategoryDeleteModal'; // Adjusted import for delete modal

const AdminCategoryCreation = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalType, setModalType] = useState(null); // 'edit', 'create', 'delete'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState({
    name: '',
    description: '',
  });
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch categories. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setCategoryDetails({ name: category.name, description: category.description }); // Pre-fill with selected category details
    setModalType('edit');
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setModalType('delete');
  };

  const handleCreateCategory = () => {
    setSelectedCategory(null);
    setCategoryDetails({ name: '', description: '' }); // Clear fields for new category
    setModalType('create');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${selectedCategory._id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== selectedCategory._id)
      );
      alert('Category deleted successfully!');
    } catch (err) {
      console.error(err);
      setError('Error deleting category. Please try again.');
    } finally {
      setModalType(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = modalType === 'edit'
        ? await axios.put(
            `http://localhost:5000/api/categories/${selectedCategory._id}`,
            categoryDetails,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
        : await axios.post('http://localhost:5000/api/categories', categoryDetails, {
            headers: { Authorization: `Bearer ${token}` },
          });

      const updatedCategory = response.data;

      setCategories((prevCategories) =>
        modalType === 'edit'
          ? prevCategories.map((cat) =>
              cat._id === updatedCategory._id ? updatedCategory : cat
            )
          : [...prevCategories, updatedCategory]
      );

      alert(modalType === 'edit' ? 'Category updated successfully!' : 'Category created successfully!');
    } catch (err) {
      console.error(err);
      setError('Error saving category. Please try again.');
    } finally {
      setLoading(false);
      setModalType(null);
    }
  };

  const columns = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'description', header: 'Description' },
    {
      id: 'actions',
      header: 'Actions',
      cell: (info) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEditCategory(info.row.original)}
            className="bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteCategory(info.row.original)}
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
        Loading categories...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Categories Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <button
          onClick={handleCreateCategory}
          className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 transition duration-300"
        >
          Create New Category
        </button>
      </div>
      <Table data={categories} columns={columns} />

      {/* Modals */}
      {modalType && (
        <CategoryEditModal
          category={selectedCategory} // Pass selected category for editing or empty for creating
          categoryDetails={categoryDetails} // Pass category details to populate the form
          handleSubmit={handleSubmit} // Handle form submission
          setCategoryDetails={setCategoryDetails} // Function to update category details
          onClose={() => setModalType(null)} // Close the modal
          isCreating={modalType === 'create'} // Flag for create vs edit
        />
      )}

      {modalType === 'delete' && (
        <CategoryDeleteModal
          categoryName={selectedCategory.name} // Pass selected category name for confirmation
          onClose={() => setModalType(null)} // Close the modal
          handleDelete={handleDelete} // Function to handle delete action
        />
      )}
    </div>
  );
};

export default AdminCategoryCreation;
