// reportController.js
const { generateTaskStatusReportPDF } = require('../services/pdfGenerator');
const { getUsersByCompany } = require('../services/UserService');
const sequelize = require('../configuration/dbConfig');
const Task = require('../models/taskModel');
const User = require('../models/userModel');

exports.getTaskStatusReport = async (req, res) => {
    try {
        const companyId = req.params.company_id;

        const users = await getUsersByCompany(companyId);
        const userIds = users.map(user => user.user_id);

        const taskReport = await Task.findAll({
            where: { user_id: userIds },
            attributes: ['status', [sequelize.fn('COUNT', 'status'), 'count']],
            group: ['status']
        });

        const totalCount = taskReport.reduce((total, task) => total + parseInt(task.get('count'), 10), 0);

        const reportWithPercentage = taskReport.map(task => ({
            status: task.status,
            count: task.get('count'),
            percentage: ((parseInt(task.get('count'), 10) / totalCount) * 100).toFixed(2)
        }));

        res.json(reportWithPercentage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
