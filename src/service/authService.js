const prisma = require("../config/prisma");
const token = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/hash");


async function addUser(data) {
    const hashedPassword = await hashPassword(data.password);
    const newUser = await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashedPassword,
        },
    });
    return newUser;
}


async function findUserEmail(data) {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    });

    if (!user) {
        throw new Error("Email atau password salah");
    }

    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
        throw new Error("Email atau password salah");
    }

    const jwt = token.generateToken(user);

    return jwt;
}


module.exports = { addUser, findUserEmail };