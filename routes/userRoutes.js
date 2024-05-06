const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/company/:companyId', userController.getUsersByCompany);
router.get('/department/:department_id', userController.getUsersByDepartment);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/:user_id', userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.get('/:user_id', userController.getUserById);

module.exports = router;
