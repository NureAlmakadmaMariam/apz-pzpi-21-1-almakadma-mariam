// testSubscriptionModel.js
const sinon = require('sinon');
const Subscription = require('../models/subscriptionModel');

const subscriptionMock = sinon.mock(Subscription);

// Налаштування очікувань для методів моделі
subscriptionMock.expects('create').resolves({ subscription_id: 1, name: 'Basic for small companies', description: 'Basic subscription plan' });
subscriptionMock.expects('findAll').resolves([
    { subscription_id: 1, name: 'Basic for small companies', description: 'Basic subscription plan' },
    { subscription_id: 2, name: 'Premium', description: 'Premium subscription plan' }
]);
subscriptionMock.expects('findByPk').withArgs(1).resolves({ subscription_id: 1, name: 'Basic for small companies', description: 'Basic subscription plan' });
subscriptionMock.expects('update').resolves(true);
subscriptionMock.expects('destroy').resolves(true);

// Тест для методу create
Subscription.create({ name: 'Basic for small companies', description: 'Basic subscription plan' }).then((result) => {
    console.log('Created subscription:', result);
}).catch((error) => {
    console.error('Error creating subscription:', error);
});

// Тест для методу findAll
Subscription.findAll().then((subscriptions) => {
    console.log('All subscriptions:', subscriptions);
}).catch((error) => {
    console.error('Error finding subscriptions:', error);
});

// Тест для методу findByPk
Subscription.findByPk(1).then((subscription) => {
    console.log('Subscription with id 1:', subscription);
}).catch((error) => {
    console.error('Error finding subscription by id:', error);
});

// Тест для методу update
Subscription.update({ name: 'Premium' }, { where: { subscription_id: 1 } }).then((result) => {
    console.log('Subscription updated:', result);
}).catch((error) => {
    console.error('Error updating subscription:', error);
});

// Тест для методу destroy
Subscription.destroy({ where: { subscription_id: 1 } }).then((result) => {
    console.log('Subscription deleted:', result);
}).catch((error) => {
    console.error('Error deleting subscription:', error);
});


// Підчищення моку після тестів
subscriptionMock.restore();
