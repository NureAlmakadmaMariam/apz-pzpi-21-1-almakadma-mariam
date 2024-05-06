// subscriptionModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');

const Subscription = sequelize.define('Subscription', {
    subscription_id: {
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
}, {
    tableName: 'subscriptions',
    timestamps: false,
});

module.exports = Subscription;
