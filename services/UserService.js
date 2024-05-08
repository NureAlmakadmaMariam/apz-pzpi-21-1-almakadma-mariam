const Department = require('../models/departmentModel');
const User = require('../models/userModel');
const Company = require('../models/companyModel');

async function getUsersByCompany(companyId) {
    try {
        const company = await Company.findByPk(companyId, {
            include: [
                {
                    model: Department,
                    as: 'departments',
                    include: [
                        {
                            model: User,
                            as: 'user',
                        }
                    ]
                }
            ]
        });

        const users = company ? company.departments.flatMap(department => department.user) : [];

        return users;
    } catch (error) {
        console.error('Error fetching users by company:', error);
        throw error;
    }
}

module.exports = {
    getUsersByCompany,
};
