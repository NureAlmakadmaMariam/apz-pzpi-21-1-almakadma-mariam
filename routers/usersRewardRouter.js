// usersRewardController.js
const express = require('express');
const router = express.Router();
const userRewardController = require('../controllers/usersRewardController');

router.post('/redeem', userRewardController.redeemReward);

module.exports = router;