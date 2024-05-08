// workHoursController.js
const WorkHours = require('../models/workHoursModel');
const WorkHoursSettings = require('../models/workHoursSettingsModel');
const Department = require('../models/departmentModel');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const { endWorkPeriod } = require('../services/workHoursService');
const { endBreak } = require('../services/breakService')
const { Op } = require('sequelize');
const userService = require('../services/UserService');

exports.startWork = async (req, res) => {
    const { user_id } = req.body;
    try {
        const startTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });

        const workHour = await WorkHours.create({ user_id, date: new Date(), start_time: startTime });

        res.status(201).json(workHour);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.startBreak = async (req, res) => {
    const { work_hours_id } = req.params;
    try {
        const workHour = await WorkHours.findByPk(work_hours_id);
        if (!workHour) {
            return res.status(404).json({ message: 'Work hour not found' });
        }
        const breakStartTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });
        workHour.break_start_time = breakStartTime;
        await workHour.save();
        res.json(workHour);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.endBreak = async (req, res) => {
    const { work_hours_id } = req.params;
    try {
        await endBreak(work_hours_id);
        res.json({ message: 'Break duration calculated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.endWork = async (req, res) => {
    const { work_hours_id } = req.params;
    try {
        await endWorkPeriod(work_hours_id);
        res.json({ message: 'Work period ended successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getAllByDepartment = async (req, res) => {
    const { department_id } = req.params;
    try {
        const workHours = await WorkHours.findAll({
            include: [
                {
                    association: 'user',
                    attributes: { exclude: ['password', 'status_id'] },
                    where: { department_id },
                    include: {
                        association: 'department',
                        attributes: ['department_id', 'name'],
                        include: {
                            association: 'company',
                            attributes: ['name', 'email']
                        }
                    }
                }
            ],
            order: [['date', 'ASC']]
        });
        res.json(workHours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getAllByUser = async (req, res) => {
    const { user_id } = req.params;
    try {
        const workHours = await WorkHours.findAll({
            where: { user_id },
            order: [['date', 'ASC']]
        });
        res.json(workHours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getWorkHoursByCompany = async (req, res) => {
    const companyId = req.params.companyId;

    try {
        const users = await userService.getUsersByCompany(companyId);

        const workHours = await WorkHours.findAll({
            attributes: [
                'work_hours_id',
                'user_id',
                'date',
                'start_time',
                'end_time',
                'total_break_duration_minutes',
                'total_work_duration_minutes',
                'total_overtime_minutes'
            ],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['user_id', 'email', 'role'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['department_id', 'name']
                        }
                    ]
                }
            ],
            where: {
                user_id: users.map(user => user.user_id)
            }
        });

        res.status(200).json({
            work_hours: workHours
        });
    } catch (error) {
        console.error('Error fetching work hours:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

/*
exports.checkAndSendOvertimeNotifications = async (req, res) => {
    try {
        // 1. Retrieve Users by Company
        const companyId = req.params.companyId; // Assuming companyId is passed in the request params
        const users = await userService.getUsersByCompany(companyId);

        // 2. Filter Work Hours for Retrieved Users
        const workHours = await WorkHours.findAll({
            where: {
                user_id: users.map(user => user.user_id)
            },
            include: [
                {
                    model: WorkHoursSettings,
                    as: 'workHoursSettings',
                    attributes: ['hours_per_day']
                }
            ]
        });

        // 3. Calculate Overtime for Each User
        const overtimeUsers = workHours.filter(workHour => {
            const userSettings = workHour.workHoursSettings;
            if (!userSettings) return false;

            const totalWorkDurationMinutes = workHour.total_work_duration_minutes || 0;
            const maxWorkDurationMinutes = userSettings.hours_per_day * 60;
            return totalWorkDurationMinutes > maxWorkDurationMinutes;
        });

        // 4. Prepare Response Data
        const overtimeUsersInfo = overtimeUsers.map(user => {
            return {
                user_id: user.user_id,
                company_id: user.department.company_id,
                overtime_minutes: user.total_work_duration_minutes
            };
        });

        // 5. Send Response with Overtime Users Information
        res.status(200).json({
            success: true,
            message: 'Overtime users information retrieved successfully',
            overtime_users: overtimeUsersInfo
        });
    } catch (error) {
        console.error('Error while retrieving overtime users information:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
*/