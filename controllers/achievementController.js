// achievementController.js
const Achievement = require('../models/achievementModel');
const User = require('../models/userModel');

exports.createAchievement = async (req, res) => {
    try {
        const { title, description, points_awarded, user_id } = req.body;
        let { date_achieved } = req.body;

        if (!date_achieved) {
            date_achieved = new Date();
        }

        const achievement = await Achievement.create({
            title,
            description,
            points_awarded,
            date_achieved,
            user_id,
        });

        if (points_awarded) {
            const user = await User.findByPk(user_id);
            if (user) {
                user.points = user.points ? user.points + points_awarded : points_awarded;
                await user.save();
            }
        }

        return res.status(201).json({ message: 'Achievement created successfully', achievement });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
