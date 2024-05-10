// pdfGenerator.js
const PDFDocument = require('pdfkit');
const WorkHours = require('../models/workHoursModel');

exports.generateDepartmentWorkHoursReport = async (workHoursData) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        // Pipe the PDF document to buffers
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        // Generate PDF content
        doc.text('Department Work Hours Report', { align: 'center', underline: true });
        doc.moveDown();

        // Iterate through each work hour entry
        workHoursData.forEach(workHour => {
            // Add work hour details
            doc.text(`User: ${workHour.user.first_name} ${workHour.user.last_name}`);
            doc.text(`Date: ${workHour.date}`);
            doc.text(`Start Time: ${workHour.start_time}`);
            doc.text(`Break Start Time: ${workHour.break_start_time}`);
            doc.text(`Break End Time: ${workHour.break_end_time}`);
            doc.text(`End Time: ${workHour.end_time}`);
            doc.text(`Total Work Duration (minutes): ${workHour.total_work_duration_minutes}`);
            doc.text(`Total Break Duration (minutes): ${workHour.total_break_duration_minutes}`);
            doc.text(`Total Overtime (minutes): ${workHour.total_overtime_minutes}`);
            doc.moveDown();
        });

        doc.end();
    });
};




/*
exports.generateTaskStatusReportPDF = async (reportData) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const buffers = [];

        // Pipe the PDF document to buffers
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);

        // Generate PDF content
        doc.text('Task Status Report', { align: 'center', underline: true });

        Object.entries(reportData).forEach(([status, count]) => {
            doc.text(`${status}: ${count}`);
        });

        doc.end();
    });
};
*/