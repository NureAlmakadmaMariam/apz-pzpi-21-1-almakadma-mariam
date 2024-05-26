// usersRewardService.js
const UsersReward = require('../models/usersRewardModel');
const User = require('../models/userModel');
const Reward = require('../models/rewardModel');

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

exports.getRewardsByUserId = async (userId) => {
    try {
        const rewards = await UsersReward.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Reward,
                    as: 'reward'
                }
            ]
        });
        return rewards;
    } catch (error) {
        console.error('Error fetching rewards by user ID:', error);
        throw new Error('Error fetching rewards');
    }
};