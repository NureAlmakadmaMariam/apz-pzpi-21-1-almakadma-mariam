// taskServices.js
const Task = require('../models/taskModel');
const User = require('../models/userModel');
const TaskExecutor = require('../models/taskExecutorModel');

exports.getTaskInfoById = async (task_id)  => {
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


exports.getAllTasksByUserId = async (user_id) => {
    return await Task.findAll({ where: { user_id }, order: [['created_at', 'DESC']] });
};

exports.deleteTaskById = async (task_id) => {
    const task = await Task.findByPk(task_id);
    if (task) {
        await task.destroy();
        return task;
    } else {
        return null;
    }
};

exports.getAllTasks = async (filter, sort = 'status') => {
    const where = {};
    if (filter.priority) {
        where.priority = filter.priority;
    }
    if (filter.status) {
        where.status = filter.status;
    }

    return await Task.findAll({ where, order: [[sort, 'ASC']] });
};

exports.createTask = async (taskData) => {
    return await Task.create({
        ...taskData,
        status: 'open',
        created_at: new Date(),
    });
};

exports.updateTask = async (task_id, updateData) => {
    const [updatedRowsCount, updatedTask] = await Task.update(updateData, {
        where: { task_id },
        returning: true,
    });

    if (updatedRowsCount > 0) {
        return updatedTask[0];
    } else {
        return null;
    }
};

exports.getAllTasksByDepartmentId = async (department_id) => {
    try {
        const tasks = await Task.findAll({
            where: { '$taskOwner.department_id$': department_id },
            include: {
                model: User,
                as: 'taskOwner',
                attributes: ['first_name', 'last_name', 'department_id']
            },
            order: [['task_id', 'DESC']]
        });
        return tasks;
    } catch (error) {
        throw new Error('Error fetching tasks by department ID');
    }
};