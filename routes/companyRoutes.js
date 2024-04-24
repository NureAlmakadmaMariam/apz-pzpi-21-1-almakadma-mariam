const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.get('/', companyController.getAllCompanies);
router.put('/:id', companyController.updateCompany);
router.put('/updateSub/:id', companyController.updateCompanySub);
router.post('/register', companyController.registerCompany);
router.post('/login', companyController.loginCompany);

module.exports = router;
