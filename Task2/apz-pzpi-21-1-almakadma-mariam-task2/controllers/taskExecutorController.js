const { createTaskExecutor, getAllTaskExecutors, getTaskExecutorsByTaskId, deleteTaskExecutor, getAllTasksAccessibleByUser } = require('../services/taskExecutorService');

exports.createTaskExecutor = async (req, res) => {
    try {
        const taskExecutorData = req.body;
        const taskExecutor = await createTaskExecutor(taskExecutorData);
        res.status(201).json({ message: 'Task executor created successfully', taskExecutor });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllTaskExecutors = async (req, res) => {
    try {
        const taskExecutors = await getAllTaskExecutors();
        res.json(taskExecutors);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTaskExecutorsByTaskId = async (req, res) => {
    try {
        const { task_id } = req.params;
        const taskExecutors = await getTaskExecutorsByTaskId(task_id);
        res.json(taskExecutors);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteTaskExecutor = async (req, res) => {
    try {
        const { task_id, executor_id } = req.params;
        const success = await deleteTaskExecutor(task_id, executor_id);
        if (success) {
            res.json({ message: 'Task executor deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task executor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllTasksAccessibleByUser = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const tasks = await getAllTasksAccessibleByUser(user_id);
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

