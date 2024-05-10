// achievementModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const User = require('./userModel');

const Achievement = sequelize.define('Achievement', {
    achievement_id: {
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
    points_awarded: {
        type: DataTypes.INTEGER,
        allowNull: true, //false
    },
    date_achieved: {
        type: DataTypes.DATE,
        allowNull: true, //false
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false
        references: {
            model: User,
            key: 'user_id',
        },
    },
}, {
    tableName: 'achievements',
    timestamps: false,
});

module.exports = Achievement;
