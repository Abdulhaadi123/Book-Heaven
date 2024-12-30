import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './pages/Home';
import Plash from './components/Plash';
import About from './components/About';
import Contactus from './components/Contactus';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLandingPage from './admin/components/AdminLandingPage';
import AdminBookCreation from './admin/components/AdminBookCreation';
import AdminAuthorCreation from './admin/components/AdminAuthorCreation';
import AdminCategoryCreation from './admin/components/AdminCategoryCreation';
import ProtectedLogin from './components/ProtectedLogin'; // Corrected capitalization
import ManageBook from './admin/components/ManageBook';

const App = () => {
  const [currentRole, setCurrentRole] = useState(null);

  // Initialize currentRole from localStorage on app load
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setCurrentRole(storedRole);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Register />} />
        <Route
          path="/login"
          element={
            <ProtectedLogin>
              <Login setCurrentRole={setCurrentRole} />
            </ProtectedLogin>
          }
        />

        {/* Protected User Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute role="user" currentRole={currentRole}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plash"
          element={
            <ProtectedRoute role="user" currentRole={currentRole}>
              <Plash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute role="user" currentRole={currentRole}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute role="user" currentRole={currentRole}>
              <Contactus />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin" currentRole={currentRole}>
              <AdminLandingPage />
            </ProtectedRoute>
          }
          
        />
         <Route
  path="/manage-books"
  element={
    <ProtectedRoute role="admin" currentRole={currentRole}>
      <ManageBook />
    </ProtectedRoute>
  }
/>

        <Route
          path="/book-creation"
          element={
            <ProtectedRoute role="admin" currentRole={currentRole}>
              <AdminBookCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="author-creation"
          element={
            <ProtectedRoute role="admin" currentRole={currentRole}>
              <AdminAuthorCreation />
            </ProtectedRoute>
          }
        />
        <Route
          path="category-creation"
          element={
            <ProtectedRoute role="admin" currentRole={currentRole}>
              <AdminCategoryCreation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
