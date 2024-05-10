const Status = require('../models/statusModel');

// Get all statuses
exports.getAllStatuses = async (req, res) => {
    try {
        const statuses = await Status.findAll();
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get statuses by type
exports.getStatusesByType = async (req, res) => {
    const { type } = req.params;
    try {
        const statuses = await Status.findAll({ where: { type } });
        res.json(statuses);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update status
exports.updateStatus = async (req, res) => {
    const { statusId } = req.params;
    const { name, description, type } = req.body;
    try {
        const status = await Status.findByPk(statusId);
        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }
        status.name = name;
        status.description = description;
        status.type = type;
        await status.save();
        res.json({ message: 'Status updated successfully', updatedStatus: status });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete status
exports.deleteStatus = async (req, res) => {
    const { statusId } = req.params;
    try {
        const status = await Status.findByPk(statusId);
        if (!status) {
            return res.status(404).json({ error: 'Status not found' });
        }
        await status.destroy();
        res.json({ message: 'Status deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
