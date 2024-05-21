const User = require('../models/userModel');
const Department = require('../models/departmentModel');
const Status = require('../models/statusModel');
const Company = require('../models/companyModel');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const transliteration = require('transliteration');


exports.getUsersByCompany = async (req, res) => {
    try {
        const company_id = req.params.companyId;

        const departments = await Department.findAll({ where: { company_id: company_id } });
        const departmentIds = departments.map(department => department.department_id);

        const users = await User.findAll({
            where: { department_id: departmentIds },
            attributes: { exclude: ['password'] },
            include: [
                { model: Status, attributes: ['name', 'description', 'type'], as: 'status' },
                { model: Department, as: 'department', attributes: ['department_id', 'name', 'department_code'] }
            ],
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUsersByDepartment = async (req, res) => {
    try {
        const department_id = req.params.department_id;

        const users = await User.findAll({
            where: { department_id },
            attributes: { exclude: ['password'] },
            include: { model: Status, attributes: ['name', 'description', 'type'], as: 'status' },
        });

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

        const latinFirstName = transliteration.transliterate(first_name);
        const latinLastName = transliteration.transliterate(last_name);

        const generatedEmail = `${latinFirstName.toLowerCase()}.${latinLastName.toLowerCase()}@example.com`;

        const generatedPassword = Math.random().toString(36).slice(-8); // Generates an 8-character random alphanumeric password

        const hashedPassword = await bcrypt.hash(generatedPassword, 10);

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
            generatedEmail
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { status_id, role, department_id, first_name, last_name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const fieldsToUpdate = {
            status_id,
            role,
            department_id,
            first_name,
            last_name
        };

        Object.entries(fieldsToUpdate).forEach(([key, value]) => {
            if (value !== undefined) {
                user[key] = value;
            }
        });

        // Update status field if status_id is provided
        if (status_id) {
            const status = await Status.findByPk(status_id);
            if (!status) {
                return res.status(404).json({ error: 'Status not found' });
            }
            user.status_id = status_id;
        }

        await user.save();

        res.json({ message: 'User updated successfully', updatedUser: user });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findByPk(user_id, {
            include: [
                { model: Department, as: 'department', attributes: ['department_id', 'name'] },
                { model: Status, as: 'status' },
                { model: Department, as: 'department', include: { model: Company, as: 'company', attributes: ['company_id', 'name'] } }
            ],
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUserPassword = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { newPassword } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

        await user.update({ password: hashedPassword });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Send token to client
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.logout = async (req, res) => {
    // Just a placeholder, as JWT tokens are stateless, there's no explicit logout
    res.json({ message: 'Logout successful' });
};