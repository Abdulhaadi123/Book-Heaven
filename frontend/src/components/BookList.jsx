import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Document, Page, pdfjs } from "react-pdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import config from './config';
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import './react-pdf-custom.css';
import SearchBar from './SearchBar';
pdfjs.GlobalWorkerOptions.workerSrc = config.pdfWorkerUrl;

const BookList = ({ books }) => {
    const [userBookmarks, setUserBookmarks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [pdfWidth, setPdfWidth] = useState(window.innerWidth - 20);
    const [documentLoaded, setDocumentLoaded] = useState(false);
    const [loadingPdf, setLoadingPdf] = useState(false);
    const [bookmarkFeedback, setBookmarkFeedback] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [readingHistory, setReadingHistory] = useState({});
    const [filteredBooks, setFilteredBooks] = useState(books);;
    const [searchQuery, setSearchQuery] = useState(''); // For managing the search query

    // Handle book search
    const handleSearch = (query) => {
        setSearchQuery(query);
    
        if (query.trim() === '') {
            // Show all books when the search query is empty
            setFilteredBooks(books);
        } else {
            // Filter the books based on the query
            const filtered = books.filter((book) =>
                book.title.toLowerCase().includes(query.toLowerCase()) ||
                (book.categoryId?.name.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredBooks(filtered);
        }
    };
    
      useEffect(() => {
        setFilteredBooks(books); // When books are fetched or passed in, set filteredBooks to the full list
    }, [books]);

    useEffect(() => {
        const getBookmarks = async () => {
            const token = localStorage.getItem('token');
            const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;

            if (!userId) {
                console.error('User ID not found in localStorage!');
                return;
            }

            try {
                const response = await axios.get(`${config.apiBaseUrl}/bookmarks`, {
                    params: { userId },
                    headers: { Authorization: `Bearer ${token}` },
                });

                const bookmarks = response.data.map(b => {
                    if (b.bookId) { 
                        return {
                            id: b._id,
                            bookId: b.bookId._id,  
                            title: b.bookId.title,  
                            page: b.page
                        };
                    } else {
                        return null; 
                    }
                }).filter(b => b !== null); 

                setUserBookmarks(bookmarks);
            } catch (error) {
                console.error('Error fetching bookmarks:', error);
            }
        };

        const getReadingHistory = async () => {
            const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`${config.apiBaseUrl}/readinghistory/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data) {
                    setReadingHistory(response.data);
                }
            } catch (error) {
                console.error('Error fetching reading history:', error);
            }
        };

        getBookmarks();
        getReadingHistory();

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        const autoSaveInterval = setInterval(saveReadingHistory, 120000); 

        return () => {
            window.removeEventListener('resize', handleResize);
            clearInterval(autoSaveInterval);
        };
    }, [pageNumber, selectedBookId, startTime]);

    useEffect(() => {
        if (documentLoaded) {
            setPdfWidth(window.innerWidth - 20);
        }
    }, [documentLoaded]);

    const saveReadingHistory = async () => {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;

        if (userId && selectedBookId && pageNumber) {
            try {
                const response = await axios.post(
                    `${config.apiBaseUrl}/readinghistory`,
                    {
                        userId,
                        bookId: selectedBookId,
                        page: pageNumber,
                        startTime,
                        endTime: new Date(),
                        pagesRead: pageNumber
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log('Reading history autosaved:', response.data);
            } catch (error) {
                console.error('Error saving reading history:', error);
            }
        } else {
            console.log('Missing required data for reading history autosave.');
        }
    };

    const handleBookmarkClick = (bookId, page) => {
        upsertBookmark(bookId, page);
    };

    const upsertBookmark = async (bookId, page) => {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(localStorage.getItem('currentUser'))?.id;

        if (!userId) {
            console.error('User ID not found when adding bookmark!');
            return;
        }

        const existingBookmark = userBookmarks.find(b => b.bookId === bookId);

        try {
            if (existingBookmark) {
                await axios.put(
                    `${config.apiBaseUrl}/bookmarks/${existingBookmark.id}`,
                    { page },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserBookmarks(prev =>
                    prev.map(b => b.id === existingBookmark.id ? { ...b, page } : b)
                );
                setBookmarkFeedback('Bookmark Updated');
            } else {
                const response = await axios.post(
                    `${config.apiBaseUrl}/bookmarks`,
                    { userId, bookId, page },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUserBookmarks(prev => [...prev, { id: response.data._id, bookId, page }]);
                setBookmarkFeedback('Bookmark Added');
            }
        } catch (error) {
            console.error('Error saving bookmark:', error);
            setBookmarkFeedback('Error saving bookmark');
        }
    };

    const closePdfView = () => {
        saveReadingHistory();
        setSelectedBook(null);
        setSelectedBookId(null);
        document.body.style.overflow = 'auto';
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setLoadingPdf(false);
    };

    const handlePdfView = (pdfUrl, bookId) => {
        setLoadingPdf(true);
        setSelectedBook(pdfUrl);
        setSelectedBookId(bookId);
        const savedPage = readingHistory.pageNumber || 1;
        setPageNumber(savedPage);
        document.body.style.overflow = 'hidden';
        setStartTime(new Date());
    };

    const goToPrevPage = () => {
        setPageNumber(prevPageNumber => {
            const newPage = Math.max(prevPageNumber - 1, 1);
            saveReadingHistory(); 
            return newPage;
        });
    };

    const goToNextPage = () => {
        setPageNumber(prevPageNumber => {
            const newPage = Math.min(prevPageNumber + 1, numPages);
            saveReadingHistory(); 
            return newPage;
        });
    };

    const isBookmarked = userBookmarks.some(b => b.bookId === selectedBookId && b.page === pageNumber);

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          handleSearch={handleSearch} 
        />
            <h2 className="text-5xl font-bold mb-8 text-gray-900 text-center tracking-wide">Available Books</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div key={book._id} className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 bg-opacity-50">
                            <div className="p-6">
                                <img src={`${config.staticFilesBaseUrl}/${book.coverImage.replace(/\\/g, '/')}`} alt={`${book.title} cover`} className="w-full h-48 object-cover rounded-md mb-4" />
                                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                                <p className="text-lg text-gray-700 mb-1 italic">by {book.authorId ? book.authorId.name : 'Unknown Author'}</p>
                                <p className="text-gray-600 mb-4">{book.description}</p>
                                <div className="flex justify-between items-center">
                              
                               
                                <button 
    onClick={() => handlePdfView(`${config.staticFilesBaseUrl}/${book.pdf}`, book._id)} 
    className="text-blue-600 hover:text-blue-800 font-medium transition">
    {readingHistory?.book?._id && readingHistory?.pageNumber > 0 ? 'Continue Reading' : 'Read'}
</button>
<button
                onClick={() => handleStartReading(`${config.staticFilesBaseUrl}/${book.pdf}`,book._id)}
                className="text-green-600 hover:text-green-800 font-medium ml-4 transition"
            >
                Start Reading
            </button>

                                    
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 bg-white p-6 rounded-lg shadow-lg border border-gray-200 bg-opacity-50">
                        <p className="text-gray-600 text-center text-lg font-medium">No books found.</p>
                    </div>
                )}
            </div>

            {bookmarkFeedback && (
                <div className="text-center text-lg text-green-600 mt-4">{bookmarkFeedback}</div>
            )}

            {selectedBook && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-4 max-w-3xl mx-auto flex flex-col relative h-full">
                        <button onClick={closePdfView} className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-red-600 text-white z-10 text-lg font-semibold">
                            Close
                        </button>
                        <div className="flex items-center justify-between mb-3">
                            <button onClick={() => handleBookmarkClick(selectedBookId, pageNumber)} className="text-xl text-gray-800 hover:text-blue-600 transition-colors focus:outline-none">
                                <FontAwesomeIcon icon={isBookmarked ? solidBookmark : regularBookmark} className="mr-2" />
                                {isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
                            </button>
                        </div>
                        <div className="flex-grow overflow-auto">
                            <Document
                                file={selectedBook}
                                onLoadSuccess={onDocumentLoadSuccess}
                                className="w-full flex justify-center mx-auto"
                            >
                                <Page pageNumber={pageNumber} width={pdfWidth} />
                            </Document>
                        </div>
                        <div className="flex justify-between items-center mt-3">
    <button 
        onClick={goToPrevPage} 
        disabled={pageNumber <= 1} 
        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
        Previous
    </button>
    <span className="text-lg text-gray-800">{pageNumber} of {numPages}</span>
    <button 
        onClick={goToNextPage} 
        disabled={pageNumber >= numPages} 
        className="px-3 py-1 rounded-lg bg-blue-600 text-white text-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
        Next
    </button>
</div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default BookList;