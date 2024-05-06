const User = require('../models/userModel');
const Department = require('../models/departmentModel');
const bcrypt = require('bcrypt');
const transliteration = require('transliteration');

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

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.createUser = async (req, res) => {
    try {
        const { first_name, last_name, department_id, start_date } = req.body;

        // Transliterate first name and last name if necessary
        const latinFirstName = transliteration.transliterate(first_name);
        const latinLastName = transliteration.transliterate(last_name);

        // Generate email based on transliterated first name and last name
        const generatedEmail = `${latinFirstName.toLowerCase()}.${latinLastName.toLowerCase()}@example.com`;

        // Generate password (for demonstration, you can adjust the complexity as needed)
        const generatedPassword = Math.random().toString(36).slice(-8); // Generates an 8-character random alphanumeric password

        // Hash the password
        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

        // Create the user
        const newUser = await User.create({
            first_name,
            last_name,
            email: generatedEmail,
            password: hashedPassword,
            department_id,
            start_date
        });

        res.status(201).json({
            message: 'User created successfully',
            newUser,
            generatedPassword,
            generatedEmail // Include the generated email in the response
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};