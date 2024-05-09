const Reward = require('../models/rewardModel');

exports.getRewardsByCompany = async (companyId) => {
    try {
        const rewards = await Reward.findAll({
            where: { company_id: companyId }
        });
        return rewards;
    } catch (error) {
        console.error('Error fetching rewards by company:', error);
        throw error;
    }
};

exports.createReward = async (title, description, points_required, type, companyId) => {
    try {
        const reward = await Reward.create({
            title,
            description,
            points_required,
            type,
            company_id: companyId
        });
        return reward;
    } catch (error) {
        console.error('Error creating reward:', error);
        throw error;
    }
};

