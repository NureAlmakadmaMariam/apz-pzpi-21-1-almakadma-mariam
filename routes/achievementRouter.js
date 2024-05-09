// achievementRouter.js
const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievementController');

router.post('/', achievementController.createAchievement);
router.delete('/:achievementId', achievementController.deleteAchievementById);
router.get('/company/:companyId', achievementController.getAchievementsByCompany);

module.exports = router;