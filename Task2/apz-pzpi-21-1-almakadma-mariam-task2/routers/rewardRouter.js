//rewardRouter.js
const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');

// POST route to create a reward for a specific company
router.post('/:companyId/', rewardController.createReward);
router.get('/:companyId', rewardController.getRewardsByCompany);

module.exports = router;