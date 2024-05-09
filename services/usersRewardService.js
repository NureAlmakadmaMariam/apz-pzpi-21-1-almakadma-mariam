// usersRewardService.js
const UsersReward = require('../models/usersRewardModel');
const User = require('../models/userModel');
const Reward = require('../models/rewardModel');
const { getUsersByCompany } = require('./userService');

exports.assignReward = async (userId, rewardId) => {
    try {
        const reward = await Reward.findByPk(rewardId);

        const user = await User.findByPk(userId);

        if (user.points >= reward.points_required) {
            const usersReward = await UsersReward.create({
                user_id: userId,
                reward_id: rewardId,
                redeemed: false
            });

            await user.update({ points: user.points - reward.points_required });

            return usersReward;
        } else {
            throw new Error('User does not have enough points to redeem this reward');
        }
    } catch (error) {
        throw error;
    }
};

exports.markRewardAsRedeemed = async (usersRewardId) => {
    try {
        const usersReward = await UsersReward.findByPk(usersRewardId);

        if (usersReward) {
            await usersReward.update({ redeemed: true });
            return usersReward;
        } else {
            throw new Error('UsersReward not found');
        }
    } catch (error) {
        throw error;
    }
};

/*
exports.getRewardsByCompany = async (companyId) => {
    try {
        // Get users belonging to the company
        const users = await getUsersByCompany(companyId);

        // Get rewards for those users
        const rewards = await Reward.findAll({
            include: [
                {
                    model: UsersReward,
                    where: {
                        user_id: users.map(user => user.user_id),
                        redeemed: false // Optionally, you can filter only unredeemed rewards
                    },
                    required: true // Ensure only rewards with matching users are included
                }
            ]
        });

        return rewards;
    } catch (error) {
        console.error('Error fetching rewards by company:', error);
        throw error;
    }
};

 */