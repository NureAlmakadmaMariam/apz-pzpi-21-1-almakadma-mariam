// companyModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');

const Company = sequelize.define('Company', {
    company_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true, /*false*/
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true, /*false*/
        /*unique: true,*/
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true, /*false*/
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true, /*false*/
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    subscription_type_id: {
        type: DataTypes.BIGINT,
        allowNull: true, /*false*/
    },
    status_id: {
        type: DataTypes.BIGINT,
        allowNull: true, /*false*/
    },
}, {
    tableName: 'company',
    timestamps: false, // Вимкнення автоматичного створення полів created_at та updated_at
});

module.exports = Company;