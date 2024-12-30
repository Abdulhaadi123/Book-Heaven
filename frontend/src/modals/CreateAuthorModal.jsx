import React, { useState, useEffect } from 'react';

const CreateAuthorModal = ({ author, handleSubmit, setEditingAuthor, isCreating }) => {
  const [authorDetails, setAuthorDetails] = useState({
    name: author?.name || '',
    bio: author?.bio || '',
    authorPhoto: null,
  });

  // Effect to update the form data if the `author` changes
  useEffect(() => {
    if (author) {
      setAuthorDetails({
        name: author.name || '',
        bio: author.bio || '',
        authorPhoto: null, // Reset photo if editing a different author
      });
    }
  }, [author]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthorDetails({ ...authorDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setAuthorDetails({ ...authorDetails, authorPhoto: e.target.files[0] });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', authorDetails.name);
    formData.append('bio', authorDetails.bio);
    if (authorDetails.authorPhoto) {
      formData.append('authorPhoto', authorDetails.authorPhoto);
    }

    handleSubmit(formData, author?._id); // Pass the ID for editing or null for creating
    setEditingAuthor(null); // Close modal after submission
  };

  // Fallback UI when author is not provided
  if (author === undefined || author === null) {
    return <div>Loading...</div>; // Or a placeholder like "No author selected"
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {isCreating ? 'Create New Author' : 'Edit Author'}
        </h2>

        {/* Form Start */}
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Author Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={authorDetails.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author's name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Author Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={authorDetails.bio}
              onChange={handleInputChange}
              rows="4"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author's bio"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="authorPhoto" className="block text-sm font-medium text-gray-700">Upload Photo</label>
            <input
              type="file"
              id="authorPhoto"
              name="authorPhoto"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md"
            />
            {authorDetails.authorPhoto && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(authorDetails.authorPhoto)}
                  alt="Author Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setEditingAuthor(null)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {isCreating ? 'Create Author' : 'Save Changes'}
            </button>
          </div>
        </form>
        {/* Form End */}
      </div>
    </div>
  );
};

export default CreateAuthorModal;
