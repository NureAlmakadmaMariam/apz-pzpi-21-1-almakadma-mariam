//commentRouter.js
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);

router.get('/', commentController.getAllComments);

router.delete('/:commentId', commentController.deleteCommentById);
router.get('/task/:taskId', commentController.getCommentsByTaskId);
module.exports = router;