const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.createBackup = async (req, res) => {
    try {
        const backupDirectory = path.join(__dirname, '..', '..', 'backups');
        if (!fs.existsSync(backupDirectory)) {
            fs.mkdirSync(backupDirectory);
        }

        const fileName = `backup_${Date.now()}.sql`;
        const filePath = path.join(backupDirectory, fileName);

        const pgDumpPath = "C:\\Program Files\\PostgreSQL\\16\\bin\\pg_dump.exe"; // Шлях до pg_dump.exe

        const pgDumpProcess = spawn(pgDumpPath, [
            '-U', 'postgres',
            '-d', 'PerformMentor',
            '-h', 'localhost',
            '-p', '5432',
            '-f', filePath,
            '-F', 't'
        ]);

        pgDumpProcess.on('exit', (code) => {
            if (code === 0) {
                console.log("Backup created");
                res.sendFile(filePath);
            } else {
                console.error('pg_dump process exited with non-zero code:', code);
                res.status(500).send('Internal Server Error');
            }
        });
    } catch (error) {
        console.error('Error creating database backup:', error);
        res.status(500).send('Internal Server Error');
    }
};



