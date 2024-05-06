const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Get all statuses
router.get('/', statusController.getAllStatuses);

// Get statuses by type
router.get('/type/:type', statusController.getStatusesByType);

// Update status
router.put('/:statusId', statusController.updateStatus);

// Delete status
router.delete('/:statusId', statusController.deleteStatus);

module.exports = router;