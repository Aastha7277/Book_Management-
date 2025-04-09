const { PrismaClient } = require('@prisma/client');
const { default: status } = require('http-status');
const { ApiError } = require('../../utils/error/ApiError');
const prisma = new PrismaClient();

const getAllBooks = async (req, res, next) => {
    try {
        const { author, category, rating, title, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;

        const filters = {};
        if (author) filters.author = author;
        if (category) filters.category = category;
        if (rating) filters.rating = { gte: parseFloat(rating) };
        if (title) filters.title = { contains: title, mode: 'insensitive' };

        const skip = (page - 1) * limit;
        const books = await prisma.book.findMany({
            where: filters,
            orderBy: { [sortBy]: order },
            skip: parseInt(skip),
            take: parseInt(limit)
        });

        res.status(status.OK).json(books);
    } catch (err) {
        next(new ApiError(status.INTERNAL_SERVER_ERROR, "Error fetching books", err.message));
    }
};


module.exports = { getAllBooks };