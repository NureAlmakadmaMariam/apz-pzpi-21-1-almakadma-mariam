//usersRewardController
const UsersRewardService = require('../services/usersRewardService');
const UsersReward = require('../models/usersRewardModel');
const User = require('../models/userModel');
const Reward = require('../models/rewardModel');


exports.assignReward = async (req, res) => {
    const { user_id, reward_id } = req.body;

    try {
        const usersReward = await UsersRewardService.assignReward(user_id, reward_id);
        res.status(201).json({ usersReward, message: 'Reward assigned successfully' });
    } catch (error) {
        console.error('Error redeeming reward:', error);
        if (error.message === 'User does not have enough points to redeem this reward') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

exports.markRewardAsRedeemed = async (req, res) => {
    const usersRewardId = req.params.usersRewardId;

    try {
        const usersReward = await UsersRewardService.markRewardAsRedeemed(usersRewardId);
        res.status(200).json({ usersReward, message: 'Reward marked as redeemed successfully' });
    } catch (error) {
        console.error('Error marking reward as redeemed:', error);
        if (error.message === 'UsersReward not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};


exports.getUsersAndRewardsByCompany = async (req, res) => {
    const companyId = req.params.companyId;
    const departmentId = req.params.departmentId;

    try {
        let usersAndRewards;

        if (departmentId) {
            usersAndRewards = await UsersReward.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['role', 'points', 'email', 'department_id'],
                    },
                    {
                        model: Reward,
                        as: 'reward',
                        where: { company_id: companyId },
                    }
                ],
                where: { '$user.department_id$': departmentId }
            });
        } else {
            usersAndRewards = await UsersReward.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['role', 'points', 'email', 'department_id'],
                    },
                    {
                        model: Reward,
                        as: 'reward',
                        where: { company_id: companyId },
                    }
                ]
            });
        }

        res.status(200).json({ usersAndRewards });
    } catch (error) {
        console.error('Error fetching users and rewards by company and department:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getRewardsByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const rewards = await UsersRewardService.getRewardsByUserId(userId);
        res.status(200).json({ rewards });
    } catch (error) {
        console.error('Error fetching rewards by user ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
