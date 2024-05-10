const { express, router, pool } = require('./configuration/commonConfig');
const sequelize = require('./configuration/dbConfig');
const bodyParser = require('body-parser');
const companyRoutes = require('./routers/companyRouter');
const subscriptionRoutes = require('./routers/subscriptionRouter');
const  departmentRoutes = require('./routers/departmentRouter');
const  userRoutes = require('./routers/userRouter');
const  statusRoutes = require('./routers/statusRouter');
const taskRoutes = require('./routers/taskRouter');
const taskExecutorRoutes = require('./routers/taskExecutorRouter');
const commentRoutes = require('./routers/commentRouter');
const workHoursSettingsRouter = require('./routers/workHoursSettingsRouter');
const workHoursRouter = require('./routers/workHoursRouter');
const achievementRouter = require('./routers/achievementRouter');
const rewardRouter = require('./routers/rewardRouter');
const usersRewardRouter = require('./routers/usersRewardRouter');
const roomRouter = require('./routers/roomRouter');
const cardRouter = require('./routers/cardRouter');
const accessLogRouter = require('./routers/accessLogRouter');
const reportRouter = require('./routers/reportRouter');

const backupRouter = require('./routers/backupRouter');
const app = express();


// Middleware
app.use(bodyParser.json());
app.use('/backup', backupRouter);
// Routes
app.use('/company', companyRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/department', departmentRoutes);
app.use('/users', userRoutes);
app.use('/status', statusRoutes);
app.use('/task', taskRoutes);
app.use('/taskExecutor', taskExecutorRoutes);
app.use('/comment', commentRoutes);
app.use('/wHS', workHoursSettingsRouter);
app.use('/workH', workHoursRouter);
app.use('/achievements', achievementRouter);
app.use('/reward', rewardRouter);
app.use('/users-reward', usersRewardRouter);
app.use('/rooms', roomRouter);
app.use('/cards', cardRouter);
app.use('/accessLog', accessLogRouter);
app.use('/report', reportRouter);

// Call initializeAssociations function after initializing Sequelize
const initializeAssociations = require('./models/association');
initializeAssociations();

const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
