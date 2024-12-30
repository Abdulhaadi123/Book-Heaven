import React from 'react';

const About = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white cursor-pointer">
                        <span className="text-yellow-300">Book</span> Reading App
                    </h1>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/home" className="text-gray-300 hover:text-white cursor-pointer">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="text-gray-300 hover:text-white cursor-pointer">About</a>
                        </li>
                        <li>
                            <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center">
                <div className="text-center p-6 max-w-lg bg-white shadow-lg rounded-lg">
                    <h2 className="text-4xl font-bold mb-4 text-blue-700">About Us</h2>
                    <p className="text-lg mb-4">
                        Welcome to our Book Reading App! Our mission is to provide a platform that connects passionate readers with a diverse collection of books across multiple genres.
                    </p>
                    <p className="text-lg mb-8">
                        Whether you're looking to dive into fiction, explore non-fiction, or discover new genres, our platform offers something for everyone. Our curated collection is designed to meet the needs of book lovers from all walks of life.
                    </p>
                    <p className="text-lg mb-8">
                        Join us as we build a community of readers who share the love for great books and knowledge. Happy reading!
                    </p>
                </div>
            </main>

            <footer className="bg-gray-800 p-4">
                <div className="container mx-auto text-center">
                    <p className="text-gray-300">&copy; {new Date().getFullYear()} Book Reading App. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default About;
