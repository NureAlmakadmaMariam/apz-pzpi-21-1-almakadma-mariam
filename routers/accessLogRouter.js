// accessLogRouter.js
const express = require('express');
const router = express.Router();
const accessLogController = require('../controllers/accessLogController');

router.post('/check-in', accessLogController.registerCheckIn);
router.post('/check-out', accessLogController.registerCheckOut);
router.get('/user/:userId', accessLogController.getAccessLogsByUserId);

module.exports = router;
