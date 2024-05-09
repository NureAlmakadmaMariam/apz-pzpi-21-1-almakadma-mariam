// achievementController.js

const Achievement = require('../models/achievementModel');

exports.deleteAchievementById = async (req, res) => {
    try {
        const achievementId = req.params.achievementId;
        const achievement = await Achievement.findByPk(achievementId);
        if (!achievement) {
            return res.status(404).json({ message: 'Achievement not found' });
        }

        await achievement.destroy();

        return res.status(200).json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
