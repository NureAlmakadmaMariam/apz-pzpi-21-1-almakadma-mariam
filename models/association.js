const Task = require('./taskModel');
const User = require('./userModel');
const TaskExecutor = require('./taskExecutorModel');
const Status = require('./statusModel');
const Department = require('./departmentModel');
const Company = require('./companyModel');
const Comment = require('./commentModel');

// Define the association after all models are initialized
const initializeAssociations = () => {
    Task.belongsTo(User, { foreignKey: 'user_id', as: 'taskOwner' });
    User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
    Task.belongsToMany(User, { through: TaskExecutor, foreignKey: 'task_id', as: 'executors' });
    User.belongsToMany(Task, { through: TaskExecutor, foreignKey: 'executor_id', as: 'assignedTasks' });
    User.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });
    User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
    Department.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
    Comment.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });
    Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = initializeAssociations;
