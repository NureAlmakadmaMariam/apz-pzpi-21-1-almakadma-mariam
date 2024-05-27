// src/pages/TasksByDepartmentPage.tsx
import React from 'react';
import TasksByDepartment from '../../components/user/TasksByDepartment';
import { FormattedMessage } from 'react-intl';
import { useAuth } from "../../hooks/useAuth";
import SidebarUser from "../../components/user/SidebarUser";

const TasksByDepartmentPage: React.FC = () => {
    const { authState } = useAuth();
    const departmentId = authState.department_id;

    if (departmentId === null) {
        return <p><FormattedMessage id="error.noDepartment" /></p>;
    }

    return (
        <div>
            <h1><FormattedMessage id="tasks.byDepartment.title" /></h1>
            <SidebarUser />
            <TasksByDepartment departmentId={departmentId} />
        </div>
    );
};

export default TasksByDepartmentPage;

