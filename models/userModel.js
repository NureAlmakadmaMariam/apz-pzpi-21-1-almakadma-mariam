// userModel.js
// userModel.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const bcrypt = require('bcrypt');
const Department = require('./departmentModel');
const Status = require('./statusModel');
const Task = require('./taskModel');

class User extends Model {}

User.init({
    user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
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
        allowNull: true,
        references: {
            model: Department,
            key: 'department_id',
        },
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
    sequelize,
    tableName: 'users',
    timestamps: false,
});

module.exports = User;





/*
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const bcrypt = require('bcrypt');
const Department = require('./departmentModel');
const Status = require('./statusModel');
const Task = require('./taskModel');

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
*/
