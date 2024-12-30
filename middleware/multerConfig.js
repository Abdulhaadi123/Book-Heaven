const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the 'uploads' folder exists, if not, create it
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with timestamp
    }
});

// File filter to allow image files and PDF files
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/; // Added pdf extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true); // Accept the file
    } else {
        req.fileValidationError = 'Only image files (jpeg, jpg, png, gif) and PDF files are allowed';
        return cb(null, false); // Reject the file
    }
};

// Initialize multer with storage and file filter for multiple fields
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;
