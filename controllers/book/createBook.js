const { PrismaClient } = require('@prisma/client');
const { default: status } = require('http-status');
const { ApiError } = require('../../utils/error/ApiError');
const prisma = new PrismaClient();

const createBook = async (req, res, next) => {
    try {
        const { title, author, category, price, rating, publishedDate } = req.body;
        if (!title || !author || !category || !price || !rating || !publishedDate) {
            return next(new ApiError(status.BAD_REQUEST, "All fields are required"));
        }
        const existingBook = await prisma.book.findFirst({ where: { title, author } });

        if (existingBook) {
            return next(new ApiError(status.BAD_REQUEST, "Book already exists", [existingBook]));
        }
        const book = await prisma.book.create({ data: req.body });

        res.status(status.CREATED).json(book);
    } catch (err) {
        next(new ApiError(status.INTERNAL_SERVER_ERROR, "Error creating book", err.message));
    }
};

module.exports = { createBook };