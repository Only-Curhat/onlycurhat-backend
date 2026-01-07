const prisma = require('../config/prisma');
const jwt = require('../utils/jwt');
const { comparePassword, hashPassword } = require('../utils/hash');
const {BadRequest} = require('../error/errorFactory');

async function authenticateUser(data) {
    const findUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (data.password.length === 0) {
        throw BadRequest('Password harus minimal 8 karakter');
    }

    if (!findUser) {
        throw BadRequest('Email dan password salah');
    }

    const isPasswordValid = await comparePassword(data.password, findUser.password);
    if (!isPasswordValid) {
        throw BadRequest('Email dan password salah');
    }
    const token = jwt.generateToken(findUser);

    return token;
}



async function registerUser(data) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (existingUser) {
        throw BadRequest('Email sudah terdaftar');
    }
    const hashedPassword = await hashPassword(data.password);
    const newUser = await prisma.user.create({
        data: {
            username : data.username,
            email: data.email,
            password: hashedPassword,
            
        }
    });

    return newUser;
}


module.exports = {
    authenticateUser,
    registerUser
};