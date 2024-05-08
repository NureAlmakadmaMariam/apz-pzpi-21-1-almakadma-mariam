// workHoursController.js
const WorkHours = require('../models/workHoursModel');
const { endWorkPeriod } = require('../services/workHoursService');
const { endBreak } = require('../services/breakService')

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
