// reportRouter.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/task-status/:company_id', reportController.getTaskStatusReport);

module.exports = router;
