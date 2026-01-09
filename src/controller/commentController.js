const commentService = require('../services/commentService');

async function createComment(req, res, next) {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const comment = await commentService.createComment(postId, userId, req.body);
        res.status(201).json({
            message: 'Komentar berhasil ditambahkan',
            data: comment
        });
    } catch (err) {
        next(err);
    }
}

async function getCommentsByPost(req, res, next) {
    try {
        const { postId } = req.params;

        const comments = await commentService.getCommentsByPost(postId);

        res.status(200).json({
            message: 'Berhasil mendapatkan komentar',
            data: comments
        });
    } catch (err) {
        next(err);
    }
}

async function deleteComment(req, res, next) {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        await commentService.deleteComment(commentId, userId);

        res.status(200).json({
            message: 'Komentar berhasil dihapus'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment
};
