const { DataTypes } = require('sequelize');
const sequelize = require('../configuration/dbConfig');

const WorkHoursSettings = sequelize.define('WorkHoursSettings', {
    setting_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    company_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: 'Company',
            key: 'company_id',
        },
    },
    max_overtime_hours_per_day: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    overtime_notification_email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    work_days_per_month: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    hours_per_day: { //without break
        type: DataTypes.DOUBLE,
        allowNull: true,
    }
}, {
    tableName: 'work_hours_settings',
    timestamps: false,
});

module.exports = WorkHoursSettings;