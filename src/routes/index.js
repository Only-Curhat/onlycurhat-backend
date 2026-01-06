const express = require('express');
const router = express.Router();
const authRouter = require("./auth");

const defaultRoute = [
{
    path:"/auth",
    router:authRouter, 
},
];

defaultRoute.forEach((route) => {
    router.use(route.path, route.router);
});


module.exports = router;