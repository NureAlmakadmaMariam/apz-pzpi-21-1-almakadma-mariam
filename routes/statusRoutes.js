const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.get('/', statusController.getAllStatuses);

router.get('/type/:type', statusController.getStatusesByType);

router.put('/:statusId', statusController.updateStatus);

router.delete('/:statusId', statusController.deleteStatus);

module.exports = router;