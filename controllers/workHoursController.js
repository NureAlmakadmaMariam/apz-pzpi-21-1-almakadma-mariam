// workHoursController.js
const WorkHours = require('../models/workHoursModel');

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


