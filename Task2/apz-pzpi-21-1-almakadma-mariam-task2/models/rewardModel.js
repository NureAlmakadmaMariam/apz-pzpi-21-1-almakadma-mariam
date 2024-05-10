// rewardModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');

const Reward = sequelize.define('Reward', {
    reward_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: true, //false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    points_required: {
        type: DataTypes.INTEGER,
        allowNull: true, //false
    },
    type: {
        type: DataTypes.ENUM('physical', 'virtual'),
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
}, {
    tableName: 'rewards',
    timestamps: false,
});

module.exports = Reward;