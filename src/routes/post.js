const postCon = require('../controller/postController');
const express = require('express');
const router = express.Router();
const { accessValidate } = require('../middleware/authValidation');

router.route('/')
  .post(accessValidate, postCon.createPost)
  .get(postCon.getPostAll);

router.get('/author/me', accessValidate, postCon.getPostMe);
router.get('/author/:authorId', postCon.getPostsByAuthor);

router.get('/:postId', postCon.getPostById);

router.route('/edit/:postId')
  .get(accessValidate, postCon.showEditPost)
  .put(accessValidate, postCon.updatePost);

router.route('/delete/:postId')
  .delete(accessValidate, postCon.deletePost);

module.exports = router;
