const { express, router, pool } = require('./configuration/commonConfig');
const sequelize = require('./configuration/dbConfig');
const bodyParser = require('body-parser');
const companyRoutes = require('./routes/companyRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/company', companyRoutes);
app.use('/subscriptions', subscriptionRoutes);

const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});