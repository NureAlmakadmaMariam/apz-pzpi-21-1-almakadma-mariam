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

exports.deleteTaskExecutor = async (req, res) => {
    try {
        const { task_id, executor_id } = req.params;
        const deletedTaskExecutor = await TaskExecutor.destroy({
            where: {
                task_id,
                executor_id
            }
        });
        if (deletedTaskExecutor === 1) {
            res.json({ message: 'Task executor deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task executor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};