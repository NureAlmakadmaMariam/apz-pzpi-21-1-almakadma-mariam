// subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.get('/', subscriptionController.getAllSubscriptionsSortedByName);

router.post('/', subscriptionController.createSubscription);

router.put('/:id', subscriptionController.updateSubscription);

router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
