const Task = require('../models/taskModel');
const User = require('../models/userModel');
const TaskExecutor = require('../models/taskExecutorModel');
const { Op } = require('sequelize');
const { getTaskInfoById, getAllTasksByUserId, deleteTaskById, getAllTasks, createTask, updateTask, getAllTasksByDepartmentId} = require('../services/taskService');

exports.createTask = async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await createTask(taskData);

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
        const sort = req.query.sort || 'status';
        const tasks = await getAllTasks({ priority, status }, sort);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

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
        const task = await deleteTaskById(taskId);

        if (task) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { task_id } = req.params;
        const updatedTask = await updateTask(task_id, req.body);

        if (updatedTask) {
            res.json({ message: 'Task updated successfully', task: updatedTask });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllTasksByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const tasks = await getAllTasksByUserId(user_id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.getAllTasksByDepartmentId = async (req, res) => {
    try {
        const department_id = req.params.department_id;
        const tasks = await getAllTasksByDepartmentId(department_id);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};