// achievementService.js
const Achievement = require('../models/achievementModel');
const User = require('../models/userModel');
const userService = require('./userService'); // Assuming userService is already implemented
const Department = require('../models/departmentModel');

class AchievementService {
    async createAchievement(title, description, points_awarded, user_id, date_achieved) {
        try {
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
                await userService.updateUserPoints(user_id, points_awarded);
            }

            return achievement;
        } catch (error) {
            console.error('Error creating achievement:', error);
            throw new Error('Failed to create achievement');
        }
    }

    async deleteAchievementById(achievementId) {
        try {
            const achievement = await Achievement.findByPk(achievementId);
            if (!achievement) {
                throw new Error('Achievement not found');
            }

            await achievement.destroy();
        } catch (error) {
            console.error('Error deleting achievement:', error);
            throw new Error('Failed to delete achievement');
        }
    }

    async getAchievementsByCompany(companyId, departmentId) {
        try {
            const users = await userService.getUsersByCompany(companyId);

            let userFilter = { user_id: users.map(user => user.user_id) };

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

            return achievements;
        } catch (error) {
            console.error('Error fetching achievements:', error);
            throw new Error('Failed to fetch achievements');
        }
    }
}

module.exports = new AchievementService();
