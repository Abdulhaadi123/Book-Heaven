const jwt = require('jsonwebtoken');

// Middleware to check the JWT token and user role (admin/user)
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Extract token from 'Authorization' header
    
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Verify the token using the secret stored in the environment variables
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user info (decoded token) to the request object
        req.user = verified;

        // Check if it's an admin-only route
        if (req.user.role === 'admin') {
            return next();  // Proceed to the next middleware or route handler for admins
        }

        // For user routes like reading history, check if the user is authenticated
        if (req.user.role === 'user') {
            // Proceed for user routes
            return next();
        }

        // If the role is not admin or user, deny access
        return res.status(403).json({ message: 'Access Denied. Unauthorized role.' });
        
    } catch (error) {
        // If token is invalid or expired
        return res.status(400).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
