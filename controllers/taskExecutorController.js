const TaskExecutor = require('../models/taskExecutorModel');

exports.createTaskExecutor = async (req, res) => {
    try {
        const { task_id, executor_id } = req.body;
        const taskExecutor = await TaskExecutor.create({ task_id, executor_id });
        res.status(201).json({ message: 'Task executor created successfully', taskExecutor });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllTaskExecutors = async (req, res) => {
    try {
        const taskExecutors = await TaskExecutor.findAll();
        res.json(taskExecutors);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTaskExecutorsByTaskId = async (req, res) => {
    try {
        const { task_id } = req.params;
        const taskExecutors = await TaskExecutor.findAll({ where: { task_id } });
        res.json(taskExecutors);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
