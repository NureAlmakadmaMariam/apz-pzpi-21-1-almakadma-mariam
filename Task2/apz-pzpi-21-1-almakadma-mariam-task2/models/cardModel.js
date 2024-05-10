// cardModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const User = require("./userModel");

const Card = sequelize.define('Card', {
    card_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false//
        references: {
            model: User,
            key: 'user_id',
        },
    },
}, {
    tableName: 'cards',
    timestamps: false,
});

module.exports = Card;