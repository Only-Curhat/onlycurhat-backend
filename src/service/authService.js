const prisma = require('../config/prisma');
const generateToken = require('../utils/jwt');
const { comparePassword, hashPassword } = require('../utils/hash');

async function authenticateUser(data) {
    const findUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (!findUser) {
        throw new Error('Email dan password salah');
    }


    const isPasswordValid = await comparePassword(data.password, findUser.password);
    if (!isPasswordValid) {
        throw new Error('Email dan password salah');
    }
    if (isPasswordValid.length === 0) {
        throw new Error('Password harus minimal 8 karakter');
    }
    const token = generateToken(findUser);

    return token;
}



async function registerUser(data) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });
    if (existingUser) {
        throw new Error('Email sudah terdaftar');
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