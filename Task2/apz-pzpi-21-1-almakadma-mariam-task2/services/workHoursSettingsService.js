// services/workHoursSettingsService.js
const WorkHoursSettings = require('../models/workHoursSettingsModel');
const Company = require('../models/companyModel');
const { Op } = require('sequelize');

exports.getAllByCompanyId = async (company_id) => {
    return await WorkHoursSettings.findAll({
        where: { company_id },
        include: [{ model: Company, as: 'company', attributes: ['name'] }]
    });
};

exports.getAll = async () => {
    return await WorkHoursSettings.findAll({
        include: [{ model: Company, as: 'company', attributes: ['name'] }]
    });
};

exports.updateHoursSettings = async (setting_id, data) => {
    const { max_overtime_hours_per_day, overtime_notification_email, work_days_per_month, hours_per_day } = data;
    const updatedSettings = await WorkHoursSettings.update(
        { max_overtime_hours_per_day, overtime_notification_email, work_days_per_month, hours_per_day },
        { where: { setting_id }, returning: true }
    );
    return updatedSettings[1][0];
};

exports.create = async (data) => {
    const { company_id, max_overtime_hours_per_day, overtime_notification_email, work_days_per_month, hours_per_day } = data;
    const company = await Company.findByPk(company_id);
    if (!company) {
        throw new Error('Company not found');
    }

    const newSettings = await WorkHoursSettings.create({
        company_id,
        max_overtime_hours_per_day,
        overtime_notification_email,
        work_days_per_month,
        hours_per_day
    });

    return newSettings;
};
