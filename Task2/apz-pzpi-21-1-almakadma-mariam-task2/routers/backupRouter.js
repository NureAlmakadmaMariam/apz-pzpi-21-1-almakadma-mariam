const express = require('express');
const router = express.Router();
const backupController = require('../controllers/backupController');

// Маршрут для створення резервної копії бази даних
router.post('/create', backupController.createBackup);

module.exports = router;
