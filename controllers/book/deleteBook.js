const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { ApiError } = require('../../utils/error/ApiError');
const status = require('http-status');

const deleteBook = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const book = await prisma.book.findUnique({ where: { id } });

        if (!book) {
            return next(new ApiError(status.NOT_FOUND, "Book not found"));
        }

        await prisma.book.delete({ where: { id } });
        res.status(status.OK).json({ message: "Book deleted successfully" });
    } catch (err) {
        next(new ApiError(status.INTERNAL_SERVER_ERROR, "Error deleting book", err.message));
    }
};
module.exports = { deleteBook };