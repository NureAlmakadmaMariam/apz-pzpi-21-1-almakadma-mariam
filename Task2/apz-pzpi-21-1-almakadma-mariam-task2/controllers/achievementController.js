// achievementController.js
const Achievement = require('../models/achievementModel');
const User = require('../models/userModel');
const Department = require('../models/departmentModel');
const userService = require('../services/UserService');

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

exports.getAchievementsByCompany = async (req, res) => {
    const companyId = req.params.companyId;
    const departmentId = req.query.departmentId; // Assuming the department ID is passed as a query parameter

    try {
        const users = await userService.getUsersByCompany(companyId);

        const userFilter = { user_id: users.map(user => user.user_id) };

        if (departmentId) {
            const usersByDepartment = users.filter(user => user.department_id === departmentId);
            userFilter.user_id = usersByDepartment.map(user => user.user_id);
        }

        const achievements = await Achievement.findAll({
            attributes: [
                'achievement_id',
                'title',
                'description',
                'points_awarded',
                'date_achieved'
            ],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['user_id', 'email', 'role'],
                    include: [
                        {
                            model: Department,
                            as: 'department',
                            attributes: ['department_id', 'name']
                        }
                    ]
                }
            ],
            where: userFilter
        });

        res.status(200).json({
            achievements: achievements
        });
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

/*
// achievementController.js
const achievementService = require('../services/achievementService');

exports.createAchievement = async (req, res) => {
    const { title, description, points_awarded, user_id, date_achieved } = req.body;

    try {
        const achievement = await achievementService.createAchievement(title, description, points_awarded, user_id, date_achieved);
        res.status(201).json({ message: 'Achievement created successfully', achievement });
    } catch (error) {
        console.error('Error creating achievement:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteAchievementById = async (req, res) => {
    const achievementId = req.params.achievementId;

    try {
        await achievementService.deleteAchievementById(achievementId);
        res.status(200).json({ message: 'Achievement deleted successfully' });
    } catch (error) {
        console.error('Error deleting achievement:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAchievementsByCompany = async (req, res) => {
    const companyId = req.params.companyId;
    const departmentId = req.query.departmentId;

    try {
        const achievements = await achievementService.getAchievementsByCompany(companyId, departmentId);
        res.status(200).json({ achievements });
    } catch (error) {
        console.error('Error fetching achievements:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

 */