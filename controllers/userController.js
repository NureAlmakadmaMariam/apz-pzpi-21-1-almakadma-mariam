const User = require('../models/userModel');
const Department = require('../models/departmentModel');

// Controller functions for user operations
exports.getUsersByCompany = async (req, res) => {
    try {
        const company_id = req.params.companyId;

        const departments = await Department.findAll({ where: { company_id: company_id } });

        const departmentIds = departments.map(department => department.department_id);

        const users = await User.findAll({ where: { department_id: departmentIds } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUsersByDepartment = async (req, res) => {
    try {
        const department_id = req.params.department_id;
        const users = await User.findAll({ where: { department_id } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
