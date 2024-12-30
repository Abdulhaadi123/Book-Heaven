import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch the book details by ID
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`/api/books/${bookId}`);
                setBook(response.data);
            } catch (err) {
                setError('Error fetching book details');
            }
        };

        fetchBook();
    }, [bookId]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/books/${bookId}`, book);
            navigate('/admin'); // Redirect to dashboard after updating
        } catch (err) {
            setError('Error updating book');
        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div className="edit-book">
            <h2>Edit Book</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        value={book.title}
                        onChange={(e) => setBook({ ...book, title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={book.description}
                        onChange={(e) => setBook({ ...book, description: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default EditBook;
