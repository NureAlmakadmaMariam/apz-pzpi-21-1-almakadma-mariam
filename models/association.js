const Task = require('./taskModel');
const User = require('./userModel');

// Define the association after all models are initialized
const initializeAssociations = () => {
    Task.belongsTo(User, { foreignKey: 'user_id', as: 'taskOwner' });
    User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
};

module.exports = initializeAssociations;
