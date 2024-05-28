// controllers/workHoursSettingsController.js
const workHoursSettingsService = require('../services/workHoursSettingsService');

exports.getAllByCompanyId = async (req, res) => {
    const { company_id } = req.params;
    try {
        const settings = await workHoursSettingsService.getAllByCompanyId(company_id);
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const settings = await workHoursSettingsService.getAll();
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateHoursSettings = async (req, res) => {
    const { setting_id } = req.params;
    try {
        const updatedSettings = await workHoursSettingsService.updateHoursSettings(setting_id, req.body);
        res.json(updatedSettings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.create = async (req, res) => {
    try {
        const newSettings = await workHoursSettingsService.create(req.body);
        res.status(201).json(newSettings);
    } catch (error) {
        if (error.message === 'Company not found') {
            return res.status(404).json({ message: error.message });
        }
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};




/*
// workHoursSettingsController.js
const WorkHoursSettings = require('../models/workHoursSettingsModel');
const Company = require('../models/companyModel');
const { Op } = require('sequelize');

exports.getAllByCompanyId = async (req, res) => {
    const { company_id } = req.params;
    try {
        const settings = await WorkHoursSettings.findAll({
            where: { company_id },
            include: [{ model: Company, as: 'company', attributes: ['name'] }]
        });
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const settings = await WorkHoursSettings.findAll({
            include: [{ model: Company, as: 'company', attributes: ['name'] }]
        });
        res.json(settings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.updateHoursSettings = async (req, res) => {
    const { setting_id } = req.params;
    const { max_overtime_hours_per_day, overtime_notification_email, work_days_per_month, hours_per_day } = req.body;
    try {
        const updatedSettings = await WorkHoursSettings.update(
            { max_overtime_hours_per_day, overtime_notification_email, work_days_per_month, hours_per_day },
            { where: { setting_id }, returning: true }
        );
        res.json(updatedSettings[1][0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.create = async (req, res) => {
    const { company_id, max_overtime_hours_per_day, overtime_notification_email, work_days_per_month, hours_per_day } = req.body;
    try {
        const company = await Company.findByPk(company_id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const newSettings = await WorkHoursSettings.create({
            company_id,
            max_overtime_hours_per_day,
            overtime_notification_email,
            work_days_per_month,
            hours_per_day
        });

        res.status(201).json(newSettings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
*/