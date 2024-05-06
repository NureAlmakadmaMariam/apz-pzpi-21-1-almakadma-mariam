// taskModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const User = require('./userModel');

class Task extends Model {}

Task.init({
    task_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('open', 'in_progress', 'closed', 'frozen'),
        allowNull: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    tableName: 'tasks',
    timestamps: false,
});


module.exports = Task;





/*
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const User = require('./userModel');


const Task = sequelize.define('Task', {
    task_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true, //false//
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: true, //false//
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
        allowNull: true, //false//
    },
    status: {
        type: DataTypes.ENUM('open', 'in_progress', 'closed', 'frozen'),
        allowNull: true, //false//
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false//
        references: {
            model: User,
            key: 'user_id',
        },
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'tasks',
    timestamps: false,


});
module.exports = Task;
*/

