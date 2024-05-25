const Reward = require('../models/rewardModel');
const Department = require('../models/departmentModel')
const Company = require("../models/companyModel");
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

exports.getRewardsByDepartment = async (departmentId) => {
    try {
        const department = await Department.findOne({
            where: { department_id: departmentId },
            include: {model: Company, as:'company'}
        });

        if (!department) {
            throw new Error('Department not found');
        }

        const companyId = department.company_id;
        const rewards = await Reward.findAll({
            where: { company_id: companyId }
        });

        return rewards;
    } catch (error) {
        console.error('Error fetching rewards by department:', error);
        throw error;
    }
};