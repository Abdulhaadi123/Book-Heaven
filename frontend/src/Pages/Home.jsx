import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBooks, searchBooks, getAllCategories, addBookmark, getReadingHistory } from '../api';
import Header from '../components/Header';
import BookList from '../components/BookList';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar'; // Ensure SearchBar is imported

const Home = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [bookmarkedBooks, setBookmarkedBooks] = useState([]);
    const [readingHistory, setReadingHistory] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [pdfUrl, setPdfUrl] = useState('');
    const [numPages, setNumPages] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedBooks = await getAllBooks();
            setBooks(fetchedBooks);

            const fetchedCategories = await getAllCategories();
            setCategories(fetchedCategories);

            if (userId) {
                const history = await getReadingHistory(userId);
                setReadingHistory(history);
            }
        };

        fetchData();
    }, [userId]);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedBooks = await getAllBooks();
            setBooks(fetchedBooks); // Load all books by default
        };
    
        fetchData(); // Call this only once on mount
    }, []); // Empty dependency array ensures it runs only once
    
    
    

    const handleBookmark = async (bookId) => {
        await addBookmark(bookId);
        setSuccessMessage('Book bookmarked successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />
            <main className="flex-grow p-8">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-center mb-6">Explore Our Library</h1>

                    {successMessage && (
                        <div className="bg-green-100 text-green-700 p-4 rounded-lg mb-6 text-center">
                            {successMessage}
                        </div>
                    )}

                    <BookList
                        books={books}
                        handleBookmark={handleBookmark}
                        bookmarkedBooks={bookmarkedBooks}
                        extraClass="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    />

                    {pdfUrl && (
                        <div className="pdf-viewer mt-6">
                            <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                ))}
                            </Document>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <Link to="/about" className="text-blue-500 hover:underline">
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
