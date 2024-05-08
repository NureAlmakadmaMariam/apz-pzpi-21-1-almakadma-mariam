// breakService.js

const WorkHours = require('../models/workHoursModel');

const endBreak = async (workHoursId) => {
    const workHour = await WorkHours.findByPk(workHoursId);
    if (!workHour) {
        throw new Error('Work hour not found');
    }

    if (!workHour.break_start_time) {
        throw new Error('Break start time not set');
    }

    const currentDate = new Date();
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });

    const breakStartTime = new Date(`${currentDate.toDateString()} ${workHour.break_start_time}`);

    workHour.break_end_time = currentTime;

    const breakDurationMilliseconds = currentDate - breakStartTime;
    if (breakDurationMilliseconds < 0) {
        throw new Error('Break end time is earlier than break start time');
    }

    const totalBreakDurationMinutes = Math.floor(breakDurationMilliseconds / (1000 * 60));
    workHour.total_break_duration_minutes = totalBreakDurationMinutes;

    await workHour.save();
};

module.exports = { endBreak };
