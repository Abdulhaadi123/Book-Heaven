import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Plash = () => {
    const navigate = useNavigate();
    const [authors, setAuthors] = useState([]);

    const handleGetStarted = () => {
        navigate('/home');
    };

    const handleHome = () => {
        navigate('/home');
    };

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/authors');
                console.log(response);
                
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1
                        className="text-2xl font-bold text-white cursor-pointer"
                        onClick={handleHome}
                    >
                        <span className="text-yellow-300">Book</span> Reading App
                    </h1>
                    <ul className="flex space-x-4">
                        <li>
                            {/* Use Link instead of <a> */}
                            <Link
                                to="/home"
                                className="text-gray-300 hover:text-white cursor-pointer"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="text-gray-300 hover:text-white"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="text-gray-300 hover:text-white"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center">
                <div className="text-center p-6 max-w-lg bg-white shadow-lg rounded-lg">
                    <h2 className="text-4xl font-bold mb-4 text-blue-700">
                        Welcome to Our Book Reading App!
                    </h2>
                    <p className="text-lg mb-4">
                        Immerse yourself in a world of knowledge and adventure. Our platform offers a vast collection of books across genres, allowing you to discover, read, and bookmark your favorites with ease.
                    </p>
                    <p className="text-lg mb-8">
                        Whether you're a passionate reader or just starting your literary journey, we have something for everyone. Join us in exploring the endless possibilities that books have to offer!
                    </p>
                    <button
                        onClick={handleGetStarted}
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Get Started
                    </button>
                </div>
            </main>

            <section className="bg-gray-200 p-8">
                <div className="container mx-auto text-center">
                    <h3 className="text-3xl font-bold mb-4 text-blue-700">
                        Meet Our Authors
                    </h3>
                    <div className="flex flex-wrap justify-center">
                        {authors?.map((author) => (
                            <div key={author._id} className="m-4">
                                <Link to={`/author/${author._id}`}>
                                    <img
                                        src={`http://localhost:5000/${author.authorPhoto}`}
                                        alt={author.name}
                                        className="w-32 h-32 rounded-full object-cover shadow-lg"
                                    />
                                    <h4 className="text-lg font-bold mt-2">
                                        {author.name}
                                    </h4>
                                </Link>
                                <p className="text-sm text-gray-600">{author.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="bg-gray-800 p-4">
                <div className="container mx-auto text-center">
                    <p className="text-gray-300">
                        &copy; {new Date().getFullYear()} Book Reading App. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Plash;
