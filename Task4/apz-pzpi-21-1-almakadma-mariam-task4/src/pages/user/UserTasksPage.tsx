// src/pages/UserTasksPage.tsx
import React from 'react';
import UserTasks from '../../components/user/UserTasks';
import { useAuth } from '../../hooks/useAuth';
import SidebarUser from "../../components/user/SidebarUser";
import { FormattedMessage } from "react-intl";

const UserTasksPage: React.FC = () => {
    const { authState } = useAuth();

    return (
        <div>
            <h1><FormattedMessage id="user.taskP" /></h1>
            <SidebarUser />
            <UserTasks userId={authState.user_id} />
        </div>
    );
};

export default UserTasksPage;
