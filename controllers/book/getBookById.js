const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../../utils/error/ApiError');
const status = require('http-status');

const getBookById = async (req, res, next) => {
    try {
        const book = await prisma.book.findUnique({ where: { id: req.params.id } });
        if (!book) return next(new ApiError(status.NOT_FOUND, "Book not found"));
        res.status(status.OK).json(book);
    } catch (err) {
        next(new ApiError(status.INTERNAL_SERVER_ERROR, "Error fetching book", err.message));
    }
};
module.exports = { getBookById };