// achievementRouter.js
const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');


router.delete('/:achievementId', achievementController.deleteAchievementById);

module.exports = router;