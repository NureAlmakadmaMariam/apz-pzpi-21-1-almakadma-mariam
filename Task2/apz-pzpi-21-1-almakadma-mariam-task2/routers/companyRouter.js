const express = require('express');
const companyController = require('../controllers/companyController');

const router = express.Router();

router.get('/', companyController.getAllCompanies);
router.put('/:id', companyController.updateCompany);
router.put('/updateSub/:id', companyController.updateCompanySub);
router.post('/register', companyController.registerCompany);
router.post('/login', companyController.loginCompany);
router.post('/logout', companyController.logoutCompany);
router.get('/:id', companyController.getCompanyById);

module.exports = router;
