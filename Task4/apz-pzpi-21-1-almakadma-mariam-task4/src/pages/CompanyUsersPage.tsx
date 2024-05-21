// src/pages/CompanyUsersPage.tsx

import React, { useState } from 'react';
import { useUsersByCompany } from '../hooks/useUsersByCompany';
import { useDepartments } from '../hooks/useDepartments';
import UserList from '../components/UserList';
import Sidebar from '../components/Sidebar';
import DepartmentDropdown from '../components/DepartmentDropdown';
import styles from '../styles/CompanyUsersPage.module.css';
import { FormattedMessage, useIntl } from 'react-intl';

const CompanyUsersPage: React.FC = () => {
    const companyId = localStorage.getItem('companyId');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string>('');

    const { users, loading: usersLoading, error: usersError } = useUsersByCompany(companyId || '', lastName);
    const { departments, loading: departmentsLoading, error: departmentsError } = useDepartments(companyId || '');

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartmentId(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const filteredUsers = selectedDepartmentId
        ? users.filter(user => user.department && String(user.department.department_id) === selectedDepartmentId)
        : users;

    const intl = useIntl();

    if (!companyId) {
        return <div><FormattedMessage id="company.Id.notFound" /></div>;
    }

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.filterContainer}>
                    <input
                        type="text"
                        placeholder={intl.formatMessage({ id: 'user.lastN' })}
                        value={lastName}
                        onChange={handleLastNameChange}
                        className={styles.searchInput}
                    />
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
                </div>
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
