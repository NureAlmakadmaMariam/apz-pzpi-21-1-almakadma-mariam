// companyController.js
const Company = require('../models/companyModel');
const Subscription = require('../models/subscriptionModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getAllCompanies = async (req, res) => {
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

exports.registerCompany = async (req, res) => {
    const { name, email, password, address, subscription_type_id, status_id } = req.body;

    try {
        // Створення нової компанії у базі даних
        const newCompany = await Company.create({
            name,
            email,
            password,
            address,
            subscription_type_id,
            status_id,
        });

        res.status(201).json({ message: 'Компанія успішно зареєстрована', company: newCompany });
    } catch (error) {

        console.error('Помилка при реєстрації компанії:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

exports.loginCompany = async (req, res) => {
    const { email, password } = req.body;

    try {
        const company = await Company.findOne({ where: { email } });

        if (!company) {
            return res.status(404).json({ message: 'Компанія з таким емейлом не знайдена' });
        }

        const passwordMatch = await bcrypt.compare(password, company.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Невірний пароль' });
        }

        // Генерація JWT токена
        const token = jwt.sign({ companyId: company.company_id }, 'your_secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Успішний вхід', companyId: company.company_id, token });
    } catch (error) {
        console.error('Помилка при вході компанії:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};


exports.updateCompanySub = async (req, res) => {
    const { id } = req.params;
    const { subscription_type } = req.body;

    try {

        // Перевірка, чи передано ID або назву підписки
        let subscriptionId;
        if (Number.isInteger(subscription_type)) {
            subscriptionId = subscription_type; // Якщо передано ID підписки
        } else {
            // Якщо передано назву, знаходимо ID за назвою
            const subscription = await Subscription.findOne({ where: { name: subscription_type } });
            if (!subscription) {
                console.error('Такий тип підписки не знайдено');
                return res.status(404).json({ message: 'Такий тип підписки не знайдено' });
            }
            subscriptionId = subscription.subscription_id;
        }

        await Company.update({ subscription_type_id: subscriptionId }, { where: { company_id: id } });

        res.status(200).json({ message: 'Дані компанії успішно оновлені' });
    } catch (error) {
        console.error('Помилка при оновленні даних компанії:', error);
        res.status(500).json({ message: 'Помилка сервера', error });
    }
};

exports.updateCompany = async (req, res) => {
    const { id } = req.params;
    const { name, address } = req.body;

    try {
        // Оновлення назви та адреси компанії
        await Company.update({ name, address }, { where: { company_id: id } });
        res.status(200).json({ message: 'Дані компанії успішно оновлені' });
    } catch (error) {
        console.error('Помилка при оновленні даних компанії:', error);
        res.status(500).json({ message: 'Помилка сервера', error });
    }
};

