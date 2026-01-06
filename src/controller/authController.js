const authService = require("../services/authService");



async function login (req, res, next){
try{
const user = await authService.findUserEmail(req.body);
res.status(201).json({
    message : "Login Berhasil",
    token : user.jwt
});
} catch(err){
 next(err);
}
}

async function register (req, res, next){
try{
    const user = await authService.addUser(req.body);
    res.status(201).json({
        message : "Register Berhasil",
        data : {
            id : user.id,
            username : user.username,
            email : user.email
        }
    });
}catch(err){
    next(err);
}
}

module.exports = {
    login, 
    register
}
