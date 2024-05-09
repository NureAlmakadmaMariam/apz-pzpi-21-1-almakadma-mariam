// usersRewardService.js
const UsersReward = require('../models/usersRewardModel');
const User = require('../models/userModel');
const Reward = require('../models/rewardModel');

exports.redeemReward = async (userId, rewardId) => {
    try {
        const reward = await Reward.findByPk(rewardId);

        const user = await User.findByPk(userId);

        if (user.points >= reward.points_required) {
            const usersReward = await UsersReward.create({
                user_id: userId,
                reward_id: rewardId,
                redeemed: true
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