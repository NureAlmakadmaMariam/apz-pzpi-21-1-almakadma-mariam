// commentController.js
const { createComment, getCommentsByTaskId, getAllComments, deleteCommentById } = require('../services/commentService');

exports.createComment = async (req, res) => {
    try {
        const { text, task_id, user_id } = req.body;
        const newComment = await createComment(text, task_id, user_id);
        res.status(201).json({
            message: 'Comment created successfully',
            newComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCommentsByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        const comments = await getCommentsByTaskId(taskId);
        res.status(200).json({
            message: 'Comments retrieved successfully',
            comments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await getAllComments();
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCommentById = async (req, res) => {
    try {
        const commentId = req.params.commentId;
        await deleteCommentById(commentId);
        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
