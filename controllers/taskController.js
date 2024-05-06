const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    try {
        const { description, deadline, priority, owner_id } = req.body;

        const newTask = await Task.create({
            description,
            deadline,
            priority,
            status: 'open',
            owner_id,
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