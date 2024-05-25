// src/pages/UsersByDepartmentPage.tsx
import React from 'react';
import UsersByDepartment from '../../components/user/UsersByDepartment';
import SidebarUser from '../../components/user/SidebarUser';
import { useAuth } from '../../hooks/useAuth';

const UsersByDepartmentPage: React.FC = () => {
    const { authState } = useAuth();

    if (!authState.user_id) {
        return <p>Please log in</p>;
    }

    return (
        <div>
            <SidebarUser />
            <UsersByDepartment department_id={authState.department_id} />
        </div>
    );
}

export default UsersByDepartmentPage;
