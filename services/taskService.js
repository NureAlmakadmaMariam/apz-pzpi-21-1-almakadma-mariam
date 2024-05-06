// taskServices.js
const Task = require('../models/taskModel');
const User = require('../models/userModel');

async function getTaskInfoById(taskId) {
    try {
        const taskInfo = await Task.findByPk(taskId, {
            include: {
                model: User,
                attributes: ['first_name', 'last_name', 'email'],
                as: 'taskOwner',
            },
        });

        if (!taskInfo) {
            throw new Error('Task not found');
        }

        return taskInfo;
    } catch (error) {
        console.error(error); // Log the error
        throw new Error('Internal Server Error'); // Rethrow the error
    }
}

module.exports = { getTaskInfoById };



/*
const sequelize = require('../configuration/dbConfig');

async function getTaskInfoById(taskId) {
    try {
        const query = `
            SELECT
                tasks.task_id,
                tasks.description,
                tasks.deadline,
                tasks.priority,
                tasks.status,
                tasks.user_id,
                users.first_name,
                users.last_name,
                users.email
            FROM
                tasks
            LEFT JOIN
                users ON tasks.user_id = users.user_id
            WHERE
                tasks.task_id = :taskId
        `;
        const [taskInfo] = await sequelize.query(query, {
            replacements: { taskId: taskId },
            type: sequelize.QueryTypes.SELECT
        });

        if (!taskInfo) {
            throw new Error('Task not found');
        }

        return taskInfo;
    } catch (error) {
        throw error;
    }
}

module.exports = { getTaskInfoById };


 */