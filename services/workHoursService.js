// workHoursService.js
const WorkHours = require('../models/workHoursModel');
const WorkHoursSettings  = require('../models/workHoursSettingsModel');
const User = require('../models/userModel');

const endWorkPeriod = async (workHoursId) => {
    const workHour = await WorkHours.findByPk(workHoursId);
    if (!workHour) {
        throw new Error('Work hour not found');
    }

    if (workHour.end_time) {
        throw new Error('Work period has already ended');
    }

    if (!workHour.start_time) {
        throw new Error('Start time not set');
    }

    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Europe/Copenhagen' });
    workHour.end_time = currentTime;

    const currentDate = new Date();
    const startTime = new Date(`${currentDate.toDateString()} ${workHour.start_time}`);
    const endTime = new Date(`${currentDate.toDateString()} ${currentTime}`);
    const workDurationMilliseconds = endTime - startTime;
    const totalWorkDurationMinutes = Math.floor(workDurationMilliseconds / (1000 * 60));
    workHour.total_work_duration_minutes = totalWorkDurationMinutes;

    const user = await User.findByPk(workHour.user_id, { include: { association: 'department' } });
    if (!user) {
        throw new Error('User not found');
    }

    const companyId = user?.department?.company_id;
    if (!companyId) {
        throw new Error('Company ID not found for the user');
    }

    const workHoursSettings = await WorkHoursSettings.findOne({ where: { company_id: companyId } });
    if (!workHoursSettings) {
        throw new Error('Work hours settings not found');
    }

    const { hours_per_day } = workHoursSettings;
    if (!hours_per_day) {
        throw new Error('Hours per day not set in work hours settings');
    }

    const overtimeMinutes = totalWorkDurationMinutes - (hours_per_day * 60);
    workHour.total_overtime_minutes = Math.max(overtimeMinutes, 0);

    await workHour.save();
};

module.exports = { endWorkPeriod };
