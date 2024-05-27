// commentService.js
const Comment = require('../models/commentModel');
const Task  = require('../models/taskModel');
const User  = require('../models/userModel');

exports.createComment = async (text, task_id, user_id) => {
    try {
        const newComment = await Comment.create({
            text,
            task_id,
            user_id,
            created_at: new Date(),
        });
        return newComment;
    } catch (error) {
        console.error(error);
        throw new Error('Error creating comment');
    }
};

exports.getCommentsByTaskId = async (taskId) => {
    try {
        const comments = await Comment.findAll({
            where: { task_id: taskId },
            include: [
                { model: Task, as: 'task', attributes: ['task_id', 'description'] },
                { model: User, as: 'user', attributes: ['first_name', 'last_name', 'email'] },
            ],
        });
        return comments;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting comments by task ID');
    }
};

exports.getAllComments = async () => {
    try {
        const comments = await Comment.findAll({
            include: [
                { model: Task, as: 'task', attributes: ['task_id', 'description'] },
                { model: User, as: 'user', attributes: ['email'] },
            ],
        });
        return comments;
    } catch (error) {
        console.error(error);
        throw new Error('Error getting all comments');
    }
};

exports.deleteCommentById = async (commentId) => {
    try {
        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            throw new Error('Comment not found');
        }
        await comment.destroy();
    } catch (error) {
        console.error(error);
        throw new Error('Error deleting comment by ID');
    }
};
