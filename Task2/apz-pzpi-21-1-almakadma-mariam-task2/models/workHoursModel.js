// workHoursModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const User = require('./userModel');

const WorkHours = sequelize.define('WorkHours', {
    work_hours_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    break_start_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    break_end_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    total_break_duration_minutes: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    total_work_duration_minutes: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    total_overtime_minutes: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    }
}, {
    tableName: 'work_hours',
    timestamps: false,
});

module.exports = WorkHours;
