// userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const bcrypt = require('bcrypt');
const Department = require('./departmentModel');
const Status = require('./statusModel');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: true, //false
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: true, //false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true, //false
        //unique: true,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        set(value) {
            const hashedPassword = bcrypt.hashSync(value, bcrypt.genSaltSync(10));
            this.setDataValue('password', hashedPassword);
        },
    },
    role: {
        type: DataTypes.ENUM('employee', 'manager'),
        defaultValue: 'employee',
    },
    department_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false
        references: {
            model: Department,
            key: 'department_id',
        },
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true, //false//
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,

    },
    status_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false//
        references: {
            model: Status,
            key: 'status_id',
        },
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'users',
    timestamps: false,
});
module.exports = User;

