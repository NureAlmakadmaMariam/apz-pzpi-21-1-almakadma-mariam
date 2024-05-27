// src/pages/TasksByDepartmentPage.tsx
import React from 'react';
import TasksByDepartment from '../../components/user/TasksByDepartment';
import { FormattedMessage } from 'react-intl';
import { useAuth } from '../../hooks/useAuth';
import SidebarUser from '../../components/user/SidebarUser';
import CreateTask from '../../components/user/CreateTask'

const TasksByDepartmentPage: React.FC = () => {
    const { authState } = useAuth();
    const departmentId = authState.department_id;
    const userId= authState.user_id;

    if (departmentId === null) {
        return <p><FormattedMessage id="error.noDepartment" /></p>;
    }
    if (userId === null) {
        return <p><FormattedMessage id="error.noUser" /></p>;
    }

    return (
        <div>
            <h1><FormattedMessage id="tasks.byDepartment.title" /></h1>
            <SidebarUser />
            <CreateTask userId={userId} />
            <TasksByDepartment departmentId={departmentId} />
        </div>
    );
};

export default TasksByDepartmentPage;
