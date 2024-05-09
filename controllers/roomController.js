// roomController.js
const Room = require('../models/roomModel');

exports.createRoom = async (req, res) => {
    const { room_name } = req.body;
    const { companyId } = req.params;

    try {
        const room = await Room.create({ room_name, company_id: companyId });
        res.status(201).json({ room, message: 'Room created successfully' });
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getRoomsByCompany = async (req, res) => {
    const { companyId } = req.params;

    try {
        const rooms = await Room.findAll({
            where: {
                company_id: companyId
            }
        });
        res.status(200).json({ rooms });
    } catch (error) {
        console.error('Error fetching rooms by company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};