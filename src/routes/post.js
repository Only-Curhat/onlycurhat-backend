const postCon = require('../controllers/postController');
const express = require('express');
const router = express.Router();

router.route('/').post(postCon.createPost);
router.route('/:id').get(postCon.getPostById);