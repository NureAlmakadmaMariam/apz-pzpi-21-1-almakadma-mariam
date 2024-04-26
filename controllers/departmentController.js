const Department = require('../models/departmentModel');
const { Op } = require('sequelize');

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        if (departments.length === 0) {
            return res.status(404).json({ message: 'Відділ не знайдені' });
        }
        res.status(200).json(departments);
    } catch (error) {
        console.error('Помилка при отриманні відділів:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

const createDepartment = async (req, res) => {
    const { name, description, departmentCode, contactPersonName, contactPersonEmail, contactPersonPhone, companyId } = req.body;

    try {
        const newDepartment = await Department.create({
            name,
            description,
            department_code: departmentCode,
            contact_person_name: contactPersonName,
            contact_person_email: contactPersonEmail,
            contact_person_phone: contactPersonPhone,
            company_id: companyId
        });

        res.status(201).json({ message: 'Відділ успішно створено', department: newDepartment });
    } catch (error) {
        console.error('Помилка при створенні відділу:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

const getDepartmentsByCompanyId = async (req, res) => {
    const { companyId } = req.params;
    const { searchByDepartmentCode, searchByName, searchByContactPersonName, sortBy, sortOrder } = req.body;

    try {
        const whereCondition = { company_id: companyId };

        if (searchByDepartmentCode) {
            whereCondition.department_code = { [Op.like]: `%${searchByDepartmentCode}%` };
        }
       if (searchByName) {
            whereCondition.name = { [Op.like]: `%${searchByName}%` };
        }
        if (searchByContactPersonName) {
            whereCondition.contact_person_name = { [Op.like]: `%${searchByContactPersonName}%` };
        }

        let order = [];
        if (sortBy) {
            order.push([sortBy, sortOrder || 'asc']);
        }

        const departments = await Department.findAll({
            where: whereCondition,
            order: order,
        });

        if (departments.length === 0) {
            return res.status(404).json({ message: 'Відділи не знайдені для цієї компанії або за вказаними параметрами пошуку' });
        }

        res.status(200).json(departments);
    } catch (error) {
        console.error('Помилка при отриманні відділів за company_id та пошуком за параметрами:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};


const updateDepartment = async (req, res) => {
    const { departmentId } = req.params;
    const { description, departmentCode, contactPersonName, contactPersonEmail, contactPersonPhone } = req.body;

    try {
        console.log('departmentId:', departmentId);

        const department = await Department.findByPk(departmentId);

        if (!department) {
            return res.status(404).json({ message: 'Відділ не знайдено' });
        }

        const fieldsToUpdate = {
            description,
            department_code: departmentCode,
            contact_person_name: contactPersonName,
            contact_person_email: contactPersonEmail,
            contact_person_phone: contactPersonPhone
        };

        Object.entries(fieldsToUpdate).forEach(([key, value]) => {
            if (value !== undefined) {
                department[key] = value;
            }
        });
        await department.save({ timestamps: false });

        res.status(200).json({ message: 'Відділ успішно оновлено', department });
    } catch (error) {
        console.error('Помилка при оновленні відділу:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};

const deleteDepartment = async (req, res) => {
    const { departmentId } = req.params;

    try {
        const department = await Department.findByPk(departmentId);
        if (!department) {
            return res.status(404).json({ message: 'Відділ не знайдено' });
        }
        await department.destroy();
        res.status(200).json({ message: 'Відділ успішно видалено' });
    } catch (error) {
        console.error('Помилка при видаленні відділу:', error);
        res.status(500).json({ message: 'Помилка сервера' });
    }
};


module.exports = {
    getAllDepartments,
    getDepartmentsByCompanyId,
    updateDepartment,
    deleteDepartment,
    createDepartment
};
