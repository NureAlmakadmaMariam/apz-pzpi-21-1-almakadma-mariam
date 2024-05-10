// taskExecutorModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const Task = require('./taskModel');
const User = require('./userModel');

const TaskExecutor = sequelize.define('TaskExecutor', {
    task_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Task,
            key: 'task_id',
        },
    },
    executor_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
}, {
    tableName: 'task_executors',
    timestamps: false,
});

module.exports = TaskExecutor;
