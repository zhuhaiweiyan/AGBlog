const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get("/:postId", postController.getSinglePost);

module.exports = router;
