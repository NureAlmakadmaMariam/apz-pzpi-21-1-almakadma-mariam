//usersRewardController
const UsersRewardService = require('../services/usersRewardService');

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

/*
exports.getRewardsByCompany = async (req, res) => {
    const companyId = req.params.companyId;

    try {
        const rewards = await UsersRewardService.getRewardsByCompany(companyId);
        res.status(200).json({ rewards });
    } catch (error) {
        console.error('Error fetching rewards by company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
*/
