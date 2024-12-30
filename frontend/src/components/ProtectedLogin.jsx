import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedLogin = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // If someone is already logged in, prevent them from accessing the login page
  if (token) {
    // If an admin is logged in, redirect to /admin
    if (role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    // If a user is logged in, redirect to /home
    if (role === 'user') {
      return <Navigate to="/home" replace />;
    }
  }

  // If no one is logged in, show the login page
  return children;
};

export default ProtectedLogin;
