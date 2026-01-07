const authCon = require('../services/authService');


async function login(req, res, next) {
    try {
        const token = await authCon.authenticateUser( req.body );
        res.status(200).json({ 
            message: "Login berhasil",
            token:  token
         });
    } catch (error) {
        next(error);
    }
}

async function register(req, res, next) {
    try {
        const newUser = await authCon.registerUser(req.body);
        res.status(201).json({ 
            message: "Registrasi berhasil",
            user:  newUser
         });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    register
};