//commentRoutes.js

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);
/*
router.get('/', commentController.getAllComments);
router.get('/:commentId', commentController.getCommentById);
*/
router.delete('/:commentId', commentController.deleteCommentById);

module.exports = router;