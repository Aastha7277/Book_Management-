const { PrismaClient } = require('@prisma/client');
const { default: status } = require('http-status');
const prisma = new PrismaClient();
const { ApiError } = require('../../utils/error/ApiError');

const updateBook = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const existingBook = await prisma.book.findUnique({ where: { id } });

        if (!existingBook) {
            return next(new ApiError(status.NOT_FOUND, "Book not found"));
        }

        const updatedBook = await prisma.book.update({
            where: { id },
            data: req.body
        });

        res.status(status.OK).json(updatedBook);
    } catch (err) {
        next(new ApiError(status.INTERNAL_SERVER_ERROR, "Error updating book", err.message));
    }
};

module.exports = { updateBook };