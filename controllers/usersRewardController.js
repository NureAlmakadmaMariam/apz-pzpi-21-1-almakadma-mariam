//usersRewardController
const UsersRewardService = require('../services/usersRewardService');

exports.redeemReward = async (req, res) => {
    const { user_id, reward_id } = req.body;

    try {
        const usersReward = await UsersRewardService.redeemReward(user_id, reward_id);
        res.status(201).json({ usersReward, message: 'Reward redeemed successfully' });
    } catch (error) {
        console.error('Error redeeming reward:', error);
        if (error.message === 'User does not have enough points to redeem this reward') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};