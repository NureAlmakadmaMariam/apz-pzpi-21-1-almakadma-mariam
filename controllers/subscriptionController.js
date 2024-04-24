// subscriptionController.js
const Subscription = require('../models/subscriptionModel');


async function getAllSubscriptionsSortedByName(req, res) {
    try {
        const subscriptions = await Subscription.findAll({ order: [['name', 'ASC']] });
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function createSubscription(req, res) {
    const { name, description } = req.body;
    try {
        const newSubscription = await Subscription.create({ name, description });
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateSubscription(req, res) {
    const { id } = req.params;
    const { name, description } = req.body;
    try {
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        await subscription.update({ name, description });
        res.status(200).json({ message: 'Subscription updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function deleteSubscription(req, res) {
    const { id } = req.params;
    try {
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ message: 'Subscription not found' });
        }
        await subscription.destroy();
        res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSubscriptionsSortedByName,
    createSubscription,
    updateSubscription,
    deleteSubscription
};
