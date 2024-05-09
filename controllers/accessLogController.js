// accessLogController.js
const AccessLog = require('../models/accessLogModel');

exports.registerCheckIn = async (req, res) => {
    const { card_id, room_id } = req.body;

    try {
        const accessLog = await AccessLog.create({
            card_id: card_id,
            room_id: room_id,
            access_status: 'entry',
            access_time: new Date()
        });
        res.status(201).json({ accessLog, message: 'Check-in registered successfully' });
    } catch (error) {
        console.error('Error registering check-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.registerCheckOut = async (req, res) => {
    const { card_id, room_id } = req.body;

    try {
        const accessLog = await AccessLog.create({
            card_id: card_id,
            room_id: room_id,
            access_status: 'exit',
            access_time: new Date()
        });
        res.status(201).json({ accessLog, message: 'Check-out registered successfully' });
    } catch (error) {
        console.error('Error registering check-out:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAccessLogsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const accessLogs = await AccessLog.findAll({
            where: {
                card_id: userId
            }
        });
        res.status(200).json({ accessLogs });
    } catch (error) {
        console.error('Error fetching access logs by user ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};