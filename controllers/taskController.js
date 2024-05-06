const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
    try {
        const { description, deadline, priority, owner_id } = req.body;

        // Create the task with current date for created_at
        const newTask = await Task.create({
            description,
            deadline,
            priority,
            status: 'open', // Default status is 'open'
            owner_id,
            created_at: new Date(), // Set created_at to current date and time
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
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
