const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { ApiError } = require('../utils/error/ApiError');
const { default: status } = require('http-status');

const verifyToken = async (req, res, next) => {

    const tokenFromCookies = req.cookies?.token;
    const tokenFromHeaders = req.headers['authorization'];
    let token = tokenFromCookies || tokenFromHeaders;

    if (!token) {
        console.log("Token is null");
        return next(new ApiError(401, "Token is required"));
    }

    // Check if token starts with "Bearer " and remove the prefix
    if (token.startsWith("Bearer ")) {
        token = token.slice(7);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { maxAge: '7h' });

        console.log("Token verified");
        console.log(decoded);

        const user = await prisma.user.findUnique({
            where: { email: decoded.email }
        });

        if (!user) {
            console.log("User not found");
            return next(new ApiError(status.NOT_FOUND, "User not found"));
        }

        req.user = user;

        next();

    } catch (err) {
        console.log("Error during token verification:", err);
        if (err.name === 'TokenExpiredError') {
            console.log("Token has expired");
            return next(new ApiError(403, "Unauthorized: Token has expired", err));
        } else if (err.name === 'JsonWebTokenError') {
            console.log("Invalid token");
            return next(new ApiError(401, "Forbidden: Invalid token", err));
        } else {
            console.log("Unexpected error");
            return next(new ApiError(500, "Internal Server Error", err));
        }
    }
};

module.exports = { verifyToken };
