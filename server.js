const { express, router, pool } = require('./configuration/commonConfig');
const sequelize = require('./configuration/dbConfig');
const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
const  departmentRoutes = require('./routes/departmentRoutes');
const  userRoutes = require('./routes/userRoutes');
const  statusRoutes = require('./routes/statusRoutes');
const taskRoutes = require('./routes/taskRoutes');
const taskExecutorRoutes = require('./routes/taskExecutorRoutes');
const commentRoutes = require('./routes/commentRoutes');
const workHoursSettingsRouter = require('./routes/workHoursSettingsRouter');
const workHoursRouter = require('./routes/workHoursRouter');
const app = express();


// Middleware
app.use(bodyParser.json());

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

// Call initializeAssociations function after initializing Sequelize
const initializeAssociations = require('./models/association');
initializeAssociations();

const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
