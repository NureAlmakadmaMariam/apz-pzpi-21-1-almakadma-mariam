const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class BackupService {
    constructor(pgDumpPath) {
        this.pgDumpPath = pgDumpPath;
    }

    async createBackup(databaseName, backupDirectory) {
        try {
            if (!fs.existsSync(backupDirectory)) {
                fs.mkdirSync(backupDirectory, { recursive: true });
            }

            const fileName = `backup_${Date.now()}.sql`;
            const filePath = path.join(backupDirectory, fileName);

            const pgDumpProcess = spawn(this.pgDumpPath, [
                '-U', 'postgres',
                '-d', databaseName,
                '-h', 'localhost',
                '-p', '5432',
                '-f', filePath,
                '-F', 't'
            ]);

            return new Promise((resolve, reject) => {
                pgDumpProcess.on('exit', (code) => {
                    if (code === 0) {
                        console.log("Backup created");
                        resolve(filePath);
                    } else {
                        console.error('pg_dump process exited with non-zero code:', code);
                        reject(new Error('Backup creation failed'));
                    }
                });
            });
        } catch (error) {
            console.error('Error creating database backup:', error);
            throw new Error('Backup creation failed');
        }
    }
}

module.exports = BackupService;
