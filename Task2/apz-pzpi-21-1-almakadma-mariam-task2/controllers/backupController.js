const path = require('path');
const BackupService = require('../services/backupService');

const pgDumpPath = "C:\\Program Files\\PostgreSQL\\16\\bin\\pg_dump.exe";
const backupService = new BackupService(pgDumpPath);

exports.createBackup = async (req, res) => {
    try {
        const backupDirectory = path.join(__dirname, '..', '..', 'backups');
        const filePath = await backupService.createBackup('PerformMentor', backupDirectory);
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error creating database backup:', error);
        res.status(500).send('Internal Server Error');
    }
};
