
// src/pages/TaskStatusReportPage.tsx

import React from 'react';
import TaskStatusChart from '../components/TaskStatusChart';
import Sidebar from '../components/Sidebar';
import styles from "../styles/TaskStatusReportPage.module.css";
import { useTaskStatusReport } from '../hooks/useTaskStatusReport';
import {FormattedMessage} from "react-intl";

const TaskStatusReportPage: React.FC = () => {
    const companyId = parseInt(localStorage.getItem('companyId') || '0', 10);
    const { data, loading, error } = useTaskStatusReport(companyId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <div>
            <Sidebar />
            <div className={styles.mainContent}>
                <h1><FormattedMessage id="taskReport.name" /></h1>
                <TaskStatusChart data={data} />
            </div>
        </div>
    );
};

export default TaskStatusReportPage;

