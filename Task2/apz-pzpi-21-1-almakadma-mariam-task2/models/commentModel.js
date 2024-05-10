const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const Task = require('./taskModel');
const User = require('./userModel');

const Comment = sequelize.define('Comment', {
    comment_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: true, //false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true, //false
        defaultValue: DataTypes.NOW,
    },
    task_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false
        references: {
            model: Task,
            key: 'task_id',
        },
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false
        references: {
            model: User,
            key: 'user_id',
        },
    },
    }, {
    tableName: 'comments',
    timestamps: false,

});

module.exports = Comment;
