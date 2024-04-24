const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();
/*
Реєстрація нової компанії
router.post('/register', companyController.registerCompany);

Авторизація компанії
router.post('/login', companyController.loginCompany);
*/

router.get('/', companyController.getAllCompanies);

module.exports = router;
