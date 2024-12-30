// src/components/Loader.jsx
import React from 'react';

const Loader = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <div className="loader">Loading...</div> {/* You can customize this loader */}
    </div>
);

export default Loader;
