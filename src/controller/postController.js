const postService = require("../services/postService");

async function createPost (req, res, next){
    try {
        const userId = req.user.id;
        const newPost = await postService.createPost(req.body, userId);
        res.status(201).json({
            message: "Postingan berhasil dibuat",
            post: newPost
        });
    } catch (err) {
        next(err)
    }
}

async function getPostAll (req, res, next){
    try {
        const posts = await postService.getPostAll();
        res.status(200).json({
            message: "Berhasil mendapatkan semua postingan",
            posts: posts
        });
    } catch (err) {
        next(err)
    }
}

async function getPostById (req, res, next){
    try {
        const postId = parseInt(req.params.id);
        const post = await postService.getPostById(postId);
        res.status(200).json({
            message: "Berhasil mendapatkan postingan",
            post: post
        });
    } catch (err) {
        next(err)
    }
}

async function getPostsByAuthor (req, res, next){
    try {
        const authorId = parseInt(req.params.authorId);
        const posts = await postService.getPostsByAuthor(authorId);
        res.status(200).json({
            message: "Berhasil mendapatkan postingan berdasarkan author",
            posts: posts
        });
    } catch (err) {
        next(err)
    }
}

async function getPostMe(req, res, next) {
    try {
        const userId = req.user.id;
        const posts = await postService.getPostsByAuthor(userId);
        res.status(200).json({
            message: "Berhasil mendapatkan postingan user sendiri",
            posts: posts
        });
    } catch (err) {
        next(err)
    }
    
}


async function showEditPost (req, res, next){
    try {
        const postId = parseInt(req.params.id);
        const userId = req.user.id;
        const post = await postService.showEditPost(postId, userId);
        res.status(200).json({
            message: "Berhasil mendapatkan data postingan untuk diedit",
            post: post
        });
    } catch (err) {
        next(err)
    }   
}

async function updatePost (req, res, next){
    try {
        const postId = parseInt(req.params.id);
        const userId = req.user.id;
        const updatedPost = await postService.updatePost(postId, req.body, userId);
        res.status(200).json({  
            message: "Postingan berhasil diperbarui",
            post: updatedPost
        });
    } catch (err) {
        next(err)
    }
}

async function deletePost (req, res, next){
    try {
        const postId = parseInt(req.params.id);
        const userId = req.user.id;
        await postService.deletePost(postId, userId);
        res.status(200).json({
            message: "Postingan berhasil dihapus"
        });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createPost,
    getPostAll,
    getPostById,
    getPostMe,
    getPostsByAuthor,
    showEditPost
};

