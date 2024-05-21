// src/pages/CompanyUsersPage.tsx

import React, { useState } from 'react';
import { useUsersByCompany } from '../hooks/useUsersByCompany';
import { useDepartments } from '../hooks/useDepartments';
import UserList from '../components/UserList';
import Sidebar from '../components/Sidebar';
import DepartmentDropdown from '../components/DepartmentDropdown';
import styles from '../styles/CompanyUsersPage.module.css';
import {FormattedMessage} from "react-intl";

const CompanyUsersPage: React.FC = () => {
    const companyId = localStorage.getItem('companyId');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    const { users, loading: usersLoading, error: usersError } = useUsersByCompany(companyId || '');
    const { departments, loading: departmentsLoading, error: departmentsError } = useDepartments(companyId || '');

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartmentId(event.target.value);
    };

    const filteredUsers = selectedDepartmentId
        ? users.filter(user => user.department && String(user.department.department_id) === selectedDepartmentId)
        : users;


    if (!companyId) {
        return <div><FormattedMessage id="company.Id.notFound" /></div>;
    }

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                {departmentsLoading ? (
                    <p><FormattedMessage id="department.load" /></p>
                ) : departmentsError ? (
                    <p>{departmentsError}</p>
                ) : (
                    <DepartmentDropdown
                        departments={departments}
                        selectedDepartmentId={selectedDepartmentId}
                        onDepartmentChange={handleDepartmentChange}
                    />
                )}

                {usersLoading ? (
                    <p><FormattedMessage id="users.load" /></p>
                ) : usersError ? (
                    <p>{usersError}</p>
                ) : (
                    <UserList users={filteredUsers} />
                )}
            </div>
        </div>
    );
};

export default CompanyUsersPage;