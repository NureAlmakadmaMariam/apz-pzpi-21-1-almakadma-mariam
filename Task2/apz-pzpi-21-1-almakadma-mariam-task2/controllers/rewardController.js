//rewardController.js
const RewardService = require('../services/rewardService');

exports.getRewardsByCompany = async (req, res) => {
    const companyId = req.params.companyId;
    try {
        const rewards = await RewardService.getRewardsByCompany(companyId);
        res.status(200).json({ rewards });
    } catch (error) {
        console.error('Error fetching rewards by company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createReward = async (req, res) => {
    const { title, description, points_required, type } = req.body;
    const companyId = req.params.companyId;

    try {
        const reward = await RewardService.createReward(title, description, points_required, type, companyId);
        res.status(201).json({ reward });
    } catch (error) {
        console.error('Error creating reward:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getRewardsByDepartment = async (req, res) => {
    const departmentId = req.params.departmentId;
    try {
        const rewards = await RewardService.getRewardsByDepartment(departmentId);
        res.status(200).json({ rewards });
    } catch (error) {
        console.error('Error fetching rewards by department:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};