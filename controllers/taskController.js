const Task = require('../models/taskModel');
const User = require('../models/userModel');
const TaskExecutor = require('../models/taskExecutorModel');
const { Op } = require('sequelize');
const { getTaskInfoById } = require('../services/taskService');

exports.createTask = async (req, res) => {
    try {
        const { description, deadline, priority, user_id } = req.body;

        const newTask = await Task.create({
            description,
            deadline,
            priority,
            status: 'open',
            user_id,
            created_at: new Date(),
        });

        res.status(201).json({
            message: 'Task created successfully',
            newTask,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const { priority, status } = req.query;
        const sort = req.query.sort || 'status'; // Default sorting by status

        // Define filtering criteria
        const where = {};
        if (priority) {
            where.priority = priority;
        }
        if (status) {
            where.status = status;
        }

        const tasks = await Task.findAll({ where, order: [[sort, 'ASC']] });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTaskInfo = async (req, res) => {
    try {
        const task_id = req.params.task_id;
        const taskInfo = await getTaskInfoById(task_id);

        res.json(taskInfo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteTaskById = async (req, res) => {
    try {
        const taskId = req.params.task_id;

        const task = await Task.findByPk(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await task.destroy();

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};