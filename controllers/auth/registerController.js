const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../../utils/error/ApiError');
const { status } = require('http-status');

//@description     Register a User
//@route           POST /api/auth/register
//@access          Public
const register = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApiError(status.BAD_REQUEST, "Missing required fields: email, password"));
    }

    try {
        // Check if the user is already registered 
        const existingUser = await prisma.User.findUnique({
            where: {
                email: email
            },
            select: {
                id: true
            }
        })

        if (existingUser) {
            console.log("User already existing with this email", existingUser);
            return next(new ApiError(status.BAD_REQUEST, "User already registerd with this email!!"))
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.User.create({
            data: {
                email: email,
                password: hashedPassword,
            }
        });

        if (!newUser) {
            return next(new ApiError(status.INTERNAL_SERVER_ERROR, "Error creating user"))
        }

        // Generate the JWT Token
        const token = jwt.sign({ id: newUser.id, email, loginTime: new Date().toISOString() }, process.env.JWT_SECRET, { expiresIn: '7h' });

        // Delete the password before sending the new created user data 
        delete newUser.password;

        // Send response back to client
        res.status(status.CREATED).json({ message: 'User created successfully', user: newUser, token: token });

    } catch (error) {
        console.error('Error in registering user:', error);
        return next(new ApiError(status.INTERNAL_SERVER_ERROR, 'Error in registering user', error));
    }
};

module.exports = { register };
