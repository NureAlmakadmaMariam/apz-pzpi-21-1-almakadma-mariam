// workHoursController.js
const WorkHours = require('../models/workHoursModel');
const WorkHoursSettings  = require('../models/workHoursSettingsModel');
const User = require('../models/userModel');
const Department = require('../models/departmentModel');

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
        const workHour = await WorkHours.findByPk(work_hours_id);
        if (!workHour) {
            return res.status(404).json({ message: 'Work hour not found' });
        }

        if (!workHour.break_start_time) {
            return res.status(400).json({ message: 'Break start time not set' });
        }

        const currentDate = new Date();
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });

        const breakStartTime = new Date(`${currentDate.toDateString()} ${workHour.break_start_time}`);

        workHour.break_end_time = currentTime;

        const breakDurationMilliseconds = currentDate - breakStartTime;
        console.log('Break duration in milliseconds:', breakDurationMilliseconds);

        if (breakDurationMilliseconds < 0) {
            return res.status(400).json({ message: 'Break end time is earlier than break start time' });
        }

        const totalBreakDurationMinutes = Math.floor(breakDurationMilliseconds / (1000 * 60));
        console.log('Total break duration in minutes:', totalBreakDurationMinutes);

        workHour.total_break_duration_minutes = totalBreakDurationMinutes;

        await workHour.save();
        res.json({ message: 'Break duration calculated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/*
exports.endWork = async (req, res) => {
    const { work_hours_id } = req.params;
    try {
        const workHour = await WorkHours.findByPk(work_hours_id);
        if (!workHour) {
            return res.status(404).json({ message: 'Work hour not found' });
        }

        // Check if the work period has already ended
        if (workHour.end_time) {
            return res.status(400).json({ message: 'Work period has already ended' });
        }

        // Ensure start time is set
        if (!workHour.start_time) {
            return res.status(400).json({ message: 'Start time not set' });
        }

        // Get the current time
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });

        // Set end time
        workHour.end_time = currentTime;

        // Calculate total work duration
        const currentDate = new Date();
        const startTime = new Date(`${currentDate.toDateString()} ${workHour.start_time}`);
        const endTime = new Date(`${currentDate.toDateString()} ${currentTime}`);
        const workDurationMilliseconds = endTime - startTime;
        const totalWorkDurationMinutes = Math.floor(workDurationMilliseconds / (1000 * 60));

        // Update total work duration
        workHour.total_work_duration_minutes = totalWorkDurationMinutes;

        // Save changes to the database
        await workHour.save();

        res.json({ message: 'Work period ended successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
*/


exports.endWork = async (req, res) => {
    const { work_hours_id } = req.params;
    try {
        const workHour = await WorkHours.findByPk(work_hours_id);
        if (!workHour) {
            return res.status(404).json({ message: 'Work hour not found' });
        }

        // Check if the work period has already ended
        if (workHour.end_time) {
            return res.status(400).json({ message: 'Work period has already ended' });
        }

        // Ensure start time is set
        if (!workHour.start_time) {
            return res.status(400).json({ message: 'Start time not set' });
        }

        // Get the current time
        const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });

        // Set end time
        workHour.end_time = currentTime;

        // Calculate total work duration
        const currentDate = new Date();
        const startTime = new Date(`${currentDate.toDateString()} ${workHour.start_time}`);
        const endTime = new Date(`${currentDate.toDateString()} ${currentTime}`);
        const workDurationMilliseconds = endTime - startTime;
        const totalWorkDurationMinutes = Math.floor(workDurationMilliseconds / (1000 * 60));

        // Update total work duration
        workHour.total_work_duration_minutes = totalWorkDurationMinutes;

        // Get the user associated with this workHour
        const user = await User.findByPk(workHour.user_id, { include: { association: 'department' } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Get the company_id associated with the user through department
        const companyId = user?.department?.company_id;
        if (!companyId) {
            return res.status(400).json({ message: 'Company ID not found for the user' });
        }

        // Calculate overtime minutes based on company's work hours settings
        const workHoursSettings = await WorkHoursSettings.findOne({ where: { company_id: companyId } });
        if (!workHoursSettings) {
            return res.status(400).json({ message: 'Work hours settings not found' });
        }

        const { hours_per_day } = workHoursSettings;
        if (!hours_per_day) {
            return res.status(400).json({ message: 'Hours per day not set in work hours settings' });
        }

        const overtimeMinutes = totalWorkDurationMinutes - (hours_per_day * 60); // Convert hours per day to minutes
        if (overtimeMinutes > 0) {
            workHour.total_overtime_minutes = overtimeMinutes;
        } else {
            workHour.total_overtime_minutes = 0;
        }

        // Save changes to the database
        await workHour.save();

        res.json({ message: 'Work period ended successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
