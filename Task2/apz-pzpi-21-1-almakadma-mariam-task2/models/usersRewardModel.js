//userRewardModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const User = require('./userModel');
const Reward = require('./rewardModel');

const UsersReward = sequelize.define('UsersReward', {
    users_reward_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    redeemed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    reward_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
            model: Reward,
            key: 'reward_id',
        },
    },
}, {
    tableName: 'users_reward',
    timestamps: false,
});

module.exports = UsersReward;