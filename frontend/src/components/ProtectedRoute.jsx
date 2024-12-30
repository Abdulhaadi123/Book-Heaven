import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const role = localStorage.getItem('role');  // Get the role from localStorage

    // If there is no token or role doesn't match, redirect the user to the login page
    if (!token || (requiredRole && role !== requiredRole)) {
        return <Navigate to="/login" replace />;
    }

    // If there is a token and role matches, render the children (protected component)
    return children;
};

export default ProtectedRoute;
