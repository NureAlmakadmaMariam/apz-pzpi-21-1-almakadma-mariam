// usersRewardController.js
const express = require('express');
const router = express.Router();
const userRewardController = require('../controllers/usersRewardController');

router.post('/assignReward', userRewardController.assignReward);
router.put('/:usersRewardId', userRewardController.markRewardAsRedeemed);

/*
router.get('/:companyID', userRewardController.getRewardsByCompany);
*/

module.exports = router;