const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ApiError } = require('../../utils/error/ApiError');
const { status } = require('http-status');


//@description     Login a User
//@route           POST /api/auth/login
//@access          Registered User



const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return next(new ApiError(status.NOT_FOUND, 'User not found'));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return next(new ApiError(status.UNAUTHORIZED, 'Invalid password'));
        }
        
        // Generate the JWT Token with only id, email, and login time
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                loginTime: new Date().toISOString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '7h' }
        );

        // Delete the password before sending the user data
        delete user.password;

        res.status(status.OK).json({ message: "LOGGED IN", user, token: token });

    } catch (error) {
        next(new ApiError(status.INTERNAL_SERVER_ERROR, 'Error in logging in user'));
    }
};

module.exports = { login };
