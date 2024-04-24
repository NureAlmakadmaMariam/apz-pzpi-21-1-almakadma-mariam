// statusModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');

const Status = sequelize.define('Status', {
    status_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true, /*false*/
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM('user', 'company'),
        allowNull: true, /*false*/
    },
}, {
    tableName: 'status', // Назва таблиці у базі даних
    timestamps: false, // Вимкнення автоматичного створення полів
});

module.exports = Status;
