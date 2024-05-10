// departmentModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');

const Department = sequelize.define('Department', {
    department_id: {
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
    department_code: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    contact_person_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    contact_person_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    contact_person_phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    company_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'Company',
            key: 'company_id',
        },
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'department', // Назва таблиці у базі даних
    timestamps: true, // Включення автоматичного оновлення полів createdAt та updatedAt
    createdAt: 'created_at', // Перейменування поля createdAt на created_at
    updatedAt: 'updated_at', // Перейменування поля updatedAt на updated_at
});

module.exports = Department;
