const commentCon = require('../controller/commentController');
const express = require('express');
const router = express.Router();
const { accessValidate } = require('../middleware/authValidation');

router.post('/post/:postId/comments', accessValidate, commentCon.createComment);
router.get('/post/:postId/comments', commentCon.getCommentsByPost);

router.delete('/comments/:commentId', accessValidate, commentCon.deleteComment);

module.exports = router;