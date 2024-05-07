//commentController.js
const Comment  = require('../models/commentModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

exports.createComment = async (req, res) => {
    try {
        const { text, task_id, user_id } = req.body;

        const newComment = await Comment.create({
            text,
            task_id,
            user_id,
            created_at: new Date(),
        });

        res.status(201).json({
            message: 'Comment created successfully',
            newComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/*
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({
            include: [
                { model: Task, attributes: ['task_id', 'description'], as: 'task' },
                { model: User, attributes: ['user_id', 'name'], as: 'user' },
            ],
        });

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCommentById = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const comment = await Comment.findByPk(commentId, {
            include: [
                { model: Task, attributes: ['task_id', 'name'], as: 'task' },
                { model: User, attributes: ['user_id', 'name'], as: 'user' },
            ],
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        res.json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
*/
exports.deleteCommentById = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        await comment.destroy();

        res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
