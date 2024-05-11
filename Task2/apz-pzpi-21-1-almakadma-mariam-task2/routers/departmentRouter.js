const express = require('express');
const departmentController = require('../controllers/departmentController');

const router = express.Router();

// Роут для отримання всіх департаментів
router.get('/', departmentController.getAllDepartments);
router.post('/', departmentController.createDepartment);
router.get('/company/:companyId', departmentController.getDepartmentsByCompanyId); /**/
router.put('/:departmentId', departmentController.updateDepartment);
router.delete('/:departmentId', departmentController.deleteDepartment);

module.exports = router;
