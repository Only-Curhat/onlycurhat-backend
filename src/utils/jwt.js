const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
    const token = jsonwebtoken.sign(
        { id: user.id,}, // payload
        JWT_SECRET,                      // secret key
        { expiresIn: "7d" }              // token expiration
    );
    return token;
}

module.exports = { generateToken };