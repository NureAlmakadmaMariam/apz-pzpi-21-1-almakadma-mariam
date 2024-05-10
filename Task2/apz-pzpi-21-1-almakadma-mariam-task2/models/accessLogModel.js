// accessLogModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');
const Card = require("./cardModel");
const Room = require("./roomModel");

const AccessLog = sequelize.define('AccessLog', {
    access_log_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    card_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false
        references: {
            model: Card,
            key: 'card_id',
        },
    },
    room_id: {
        type: DataTypes.BIGINT,
        allowNull: true, //false
        references: {
            model: Room,
            key: 'room_id',
        },
    },
    access_time: {
        type: DataTypes.TIME,
        allowNull: true, //false
    },
    access_status: {
        type: DataTypes.ENUM('entry', 'exit'),
        allowNull: true, //false
    },
}, {
    tableName: 'access_logs',
    timestamps: false,
});

module.exports = AccessLog;
