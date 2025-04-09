const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/verifyToken');
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
} = require('../../controllers/book');



// 📌 Protect all book routes
router.use(verifyToken);

// POST /books - Create a new book
router.post('/addBook', createBook);

// GET /books - Get all books (with filters, pagination, search, sort)
router.get('/getAllBooks', getAllBooks);

// GET /books/:id - Get book by ID
router.get('/getBook/:id', getBookById);

// PUT /books/:id - Update book by ID
router.put('/udpateBook/:id', updateBook);

// DELETE /books/:id - Delete book by ID
router.delete('/deleteBook/:id', deleteBook);

module.exports = router;
