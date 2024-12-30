import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/home');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <nav className="bg-gray-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-white cursor-pointer" onClick={handleHome}>
                        <span className="text-yellow-300">Book</span> Reading App
                    </h1>
                    <ul className="flex space-x-4">
                        <li>
                            <a onClick={handleHome} className="text-gray-300 hover:text-white cursor-pointer">Home</a>
                        </li>
                        <li>
                            <a href="/about" className="text-gray-300 hover:text-white">About</a>
                        </li>
                        <li>
                            <a href="/contactus" className="text-gray-300 hover:text-white">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main className="flex-grow flex items-center justify-center">
                <div className="text-center p-6 max-w-lg bg-white shadow-lg rounded-lg">
                    <h2 className="text-4xl font-bold mb-4 text-blue-700">Contact Us</h2>
                    <p className="text-lg mb-8">
                        We'd love to hear from you! If you have any questions or feedback, feel free to reach out through our social media channels.
                    </p>

                    <div className="flex justify-center space-x-6 mb-8">
                        <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-blue-600 text-3xl hover:text-blue-800 transition duration-200" />
                        </a>
                        <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-pink-600 text-3xl hover:text-pink-800 transition duration-200" />
                        </a>
                        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-blue-400 text-3xl hover:text-blue-600 transition duration-200" />
                        </a>
                    </div>

                    <p className="text-lg">
                        Alternatively, you can reach us via email at <a href="mailto:contact@bookreadingapp.com" className="text-blue-600">contact@bookreadingapp.com</a>.
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

export default ContactUs;
