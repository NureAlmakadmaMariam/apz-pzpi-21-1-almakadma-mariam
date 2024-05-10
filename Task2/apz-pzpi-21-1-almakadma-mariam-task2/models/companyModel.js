// companyModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const bcrypt = require('bcrypt');

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
        /*unique: true, */
        validate: {
            isEmail: true, // Перевірка формату емейлу
        },
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true, /*false*/
        set(value) {
            // Хешування пароля перед збереженням в базу даних
            const hashedPassword = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hashedPassword);
        },
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true, /*false*/
    },
    created_at: {
        type: DataTypes.DATEONLY,
        allowNull: true, /*false*/
        defaultValue: DataTypes.NOW,
    },
    subscription_type_id: {
        type: DataTypes.BIGINT,
        allowNull: true, /*false*/
    },
    status_id: {
        type: DataTypes.BIGINT,
        allowNull: true, /*false*/
        defaultValue: 1,
    },
}, {
    tableName: 'company',
    timestamps: false, // Вимкнення автоматичного створення полів created_at та updated_at
});

module.exports = Company;