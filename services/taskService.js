// taskServices.js
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const TaskExecutor = require('../models/taskExecutorModel');

async function getTaskInfoById(task_id) {
    try {
        const taskInfo = await Task.findByPk(task_id, {
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name', 'email'],
                    as: 'taskOwner',
                },
                {
                    model: User,
                    attributes: ['first_name', 'last_name', 'email'],
                    through: { model: TaskExecutor, as: 'taskExecutors' },
                    as: 'executors',
                },
            ],
        });

        if (!taskInfo) {
            throw new Error('Task not found');
        }

        return taskInfo;
    } catch (error) {
        console.error(error);
        throw new Error('Internal Server Error');
    }
}



module.exports = { getTaskInfoById };
