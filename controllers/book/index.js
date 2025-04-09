// This module imports various controller functions related to book operations
const { createBook } = require('./createBook');
const { deleteBook } = require('./deleteBook');
const { getAllBooks } = require('./getAllBooks');
const { getBookById } = require('./getBookById');
const { updateBook } = require('./updateBook');

module.exports = {
    createBook,
    deleteBook,
    getAllBooks,
    getBookById,
    updateBook,
};