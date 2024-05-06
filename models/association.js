const Task = require('./taskModel');
const User = require('./userModel');
const TaskExecutor = require('./taskExecutorModel');

// Define the association after all models are initialized
const initializeAssociations = () => {
    Task.belongsTo(User, { foreignKey: 'user_id', as: 'taskOwner' });
    User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
    Task.belongsToMany(User, { through: TaskExecutor, foreignKey: 'task_id', as: 'executors' });
    User.belongsToMany(Task, { through: TaskExecutor, foreignKey: 'executor_id', as: 'assignedTasks' });

};

module.exports = initializeAssociations;
