const Task = require('./taskModel');
const User = require('./userModel');
const TaskExecutor = require('./taskExecutorModel');
const Status = require('./statusModel');
const Department = require('./departmentModel');
const Company = require('./companyModel');
const Comment = require('./commentModel');
const WorkHoursSettings = require('./workHoursSettingsModel');
const WorkHours = require('./workHoursModel');
const Achievement = require('./achievementModel');
const Reward = require('./rewardModel');
const UsersReward = require('./usersRewardModel');
const Room = require('./roomModel');
const Card = require('./cardModel');
const AccessLog = require('./accessLogModel');
const Subscription = require('./subscriptionModel')

// Define the association after all models are initialized
const initializeAssociations = () => {
    Task.belongsTo(User, { foreignKey: 'user_id', as: 'taskOwner' });
    User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
    Task.belongsToMany(User, { through: TaskExecutor, foreignKey: 'task_id', as: 'executors' });
    User.belongsToMany(Task, { through: TaskExecutor, foreignKey: 'executor_id', as: 'assignedTasks' });
    User.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });
    User.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
    Department.hasMany(User, { foreignKey: 'department_id', as: 'user' });
    Department.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
    Company.hasMany(Department, { foreignKey: 'company_id', as: 'departments' }); //
    Comment.belongsTo(Task, { foreignKey: 'task_id', as: 'task' });
    Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    Company.hasMany(WorkHoursSettings, { foreignKey: 'company_id', as: 'workHoursSettings' });
    WorkHoursSettings.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
    User.hasMany(WorkHours, { foreignKey: 'user_id', as: 'workHours' });
    WorkHours.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    User.hasMany(Achievement, { foreignKey: 'user_id', as: 'achievements' });
    Achievement.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    Reward.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
    Company.hasMany(Reward, { foreignKey: 'company_id', as: 'rewards' });
    Company.belongsTo(Subscription, { foreignKey: 'subscription_type_id', as: 'subscription' });
    Company.belongsTo(Status, { foreignKey: 'status_id', as: 'status' });

    UsersReward.belongsTo(Reward, { foreignKey: 'reward_id', as: 'reward' });
    Reward.hasMany(UsersReward, { foreignKey: 'reward_id', as: 'usersRewards' });
    UsersReward.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

    Room.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
    Company.hasMany(Room, { foreignKey: 'company_id', as: 'rooms' });

    Card.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
    User.hasMany(Card, { foreignKey: 'user_id', as: 'cards' });
    
    AccessLog.belongsTo(Card, { foreignKey: 'card_id', as: 'card' });
    AccessLog.belongsTo(Room, { foreignKey: 'room_id', as: 'room' });

};

module.exports = initializeAssociations;
