// roomModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');

const Room = sequelize.define('Room', {
    room_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    room_name: {
        type: DataTypes.STRING(255),
        allowNull: true, //false
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
    tableName: 'rooms',
    timestamps: false,
});

module.exports = Room;