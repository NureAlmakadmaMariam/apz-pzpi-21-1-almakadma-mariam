const express = require('express');
const departmentController = require('../controllers/departmentController');


const router = express.Router();

// Роут для отримання всіх департаментів
router.get('/', departmentController.getAllDepartments);

// Роут для отримання департаментів за company_id
router.post('/company/:companyId', departmentController.getDepartmentsByCompanyId);
router.put('/:departmentId', departmentController.updateDepartment);
router.delete('/:departmentId', departmentController.deleteDepartment);

module.exports = router;
