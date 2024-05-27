const TaskExecutor = require('../models/taskExecutorModel');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

exports.createTaskExecutor = async (taskExecutorData) => {
    return await TaskExecutor.create(taskExecutorData);
};

exports.getAllTaskExecutors = async () => {
    return await TaskExecutor.findAll();
};

exports.getTaskExecutorsByTaskId = async (task_id) => {
    const taskExecutors = await TaskExecutor.findAll({
        where: { task_id },
        include: [
            {
                model: User,
                attributes: ['first_name', 'last_name'],
                as: 'executor'
            }
        ]
    });

    return taskExecutors.map(taskExecutor => ({
        first_name: taskExecutor.executor.first_name,
        last_name: taskExecutor.executor.last_name,
    }));
};

exports.deleteTaskExecutor = async (task_id, executor_id) => {
    const result = await TaskExecutor.destroy({
        where: {
            task_id,
            executor_id
        }
    });
    return result === 1;
};

exports.getAllTasksAccessibleByUser = async (user_id) => {
    return await Task.findAll({
        include: [{
            model: User,
            as: 'executors',
            through: { attributes: [] },
            where: { user_id: user_id },
        }],
        order: [['created_at', 'DESC']],
    });
};