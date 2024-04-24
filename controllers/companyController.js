// companyController.js
const Company = require('../models/companyModel');

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll();

        if (companies.length === 0) {
            return res.status(404).json({ message: 'Список компаній порожній' });
        }


        res.status(200).json(companies);
    } catch (error) {
        console.error('Помилка при отриманні списку компаній:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

module.exports = {
    getAllCompanies,
};

