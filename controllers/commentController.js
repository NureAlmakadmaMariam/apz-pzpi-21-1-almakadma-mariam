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

exports.getCommentsByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;

        const comments = await Comment.findAll({
            where: { task_id: taskId },
            include: [
                {
                    model: Task,
                    as: 'task',
                    attributes: ['task_id', 'description'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['first_name', 'last_name', 'email'],
                },
            ],
        });

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
        const comments = await Comment.findAll({
            include: [
                { model: Task, as: 'task', attributes: ['task_id', 'description']},
                { model: User, as: 'user', attributes: ['email'] },
            ],
        });

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


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
