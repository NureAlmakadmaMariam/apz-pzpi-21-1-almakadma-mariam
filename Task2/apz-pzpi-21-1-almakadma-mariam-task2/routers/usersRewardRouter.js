// usersRewardController.js
const express = require('express');
const router = express.Router();
const userRewardController = require('../controllers/usersRewardController');

router.post('/assignReward', userRewardController.assignReward);
router.put('/:usersRewardId', userRewardController.markRewardAsRedeemed);
router.get('/company/:companyId/department/:departmentId?', userRewardController.getUsersAndRewardsByCompany);
router.get('/user/:userId', userRewardController.getRewardsByUserId);

module.exports = router;