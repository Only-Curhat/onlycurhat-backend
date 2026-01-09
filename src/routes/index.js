const express = require('express');
const router = express.Router();
const authRouter = require("./auth");
const postRouter = require("./post");

const defaultRoute = [
{
    path:"/auth",
    router:authRouter, 

},
{
    path: "/post",
    router:postRouter,
}
];

defaultRoute.forEach((route) => {
    router.use(route.path, route.router);
});


module.exports = router;