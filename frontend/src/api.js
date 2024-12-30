import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL for all API calls
});

// Function for user registration
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

// Function for user login
export const loginUser = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

// Function to fetch all books
export const getAllBooks = async () => {
    try {
        const response = await api.get('/books');
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error;
    }
};

// Function to search books
export const searchBooks = async (searchQuery) => {
    try {
        const response = await api.get('/books', {
            params: { q: searchQuery },
        });
        return response.data;
    } catch (error) {
        console.error('Error during book search:', error);
        throw error;
    }
};

// Function to fetch all categories
export const createCategory = async (categoryData) => {
    try {
        const response = await api.post('/categories', categoryData);
        return response.data;
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

// Function to fetch all categories
export const getAllCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Function to fetch a category by ID
export const getCategoryById = async (categoryId) => {
    try {
        const response = await api.get(`/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
};

// Function to update a category
export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await api.put(`/categories/${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Function to delete a category
export const deleteCategory = async (categoryId) => {
    try {
        const response = await api.delete(`/categories/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};

// Function to fetch all authors
export const getAllAuthors = async () => {
    try {
        const response = await api.get('/authors');
        return response.data;
    } catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
    }
};

// Function to add a new book
export const addBook = async (formData) => {
    try {
        const response = await api.post('/books', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

// Function to add a bookmark
// export const addBookmark = async (bookId, page) => {
//     const token = localStorage.getItem('token');
//     const userId = JSON.parse(localStorage.getItem('currentUser')).id;

//     try {
//         const response = await api.post(
//             '/bookmarks',
//             { userId, bookId, page },
//             { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log('Bookmark added:', response.data);
//         return response.data; // Return response data for further handling
//     } catch (error) {
//         console.error('Error adding bookmark:', error.response ? error.response.data : error.message);
//         throw error; // Rethrow the error for handling in the calling function
//     }
// };

// // Function to fetch all bookmarks for a user
// export const getUserBookmarks = async (userId) => {
//     const token = localStorage.getItem('token'); // Retrieve the token

//     try {
//         const response = await api.get(`/bookmarks/${userId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data; // Return the response data
//     } catch (error) {
//         console.error('Error fetching bookmarks:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };

// // Function to delete a bookmark
// export const deleteBookmark = async (bookmarkId) => {
//     const token = localStorage.getItem('token');

//     console.log(`Deleting bookmark with ID: ${bookmarkId}`);  // Debugging log for bookmark ID

//     try {
//         const response = await api.delete(`/bookmarks/${bookmarkId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log('Bookmark deleted successfully:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error deleting bookmark:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// };


// Function to add to reading history
export const addToReadingHistory = async (userId, bookId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.post(
            '/reading-history',
            { user: userId, book: bookId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding to reading history:', error);
        throw error;
    }
};

// Function to fetch reading history
export const getReadingHistory = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/reading-history/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching reading history:', error);
        throw error;
    }
};
export const addBookmark = async (userId, bookId, page, token) => {
    try {
        const response = await api.post(
            '/bookmarks',
            { userId, bookId, page },
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Authorization token
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding bookmark:', error);
        throw error;
    }
};
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// export const fetchReadingHistory = async (userId, bookId) => {
//     try {
//         const response = await axios.get(`http://localhost:5000/api/readinghistory`, {
//             params: { userId, bookId },
//         });
//         return response.data; // Return the data to be used by the component
//     } catch (error) {
//         console.error('Error fetching reading history:', error);
//         throw error; // Optionally throw the error to be handled in the calling component
//     }
// };