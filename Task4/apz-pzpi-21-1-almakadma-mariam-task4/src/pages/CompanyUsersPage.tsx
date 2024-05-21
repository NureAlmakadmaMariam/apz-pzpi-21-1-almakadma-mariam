import React, { useState } from 'react';
import { useUsersByCompany } from '../hooks/useUsersByCompany';
import { useDepartments } from '../hooks/useDepartments';
import UserList from '../components/UserList';
import Sidebar from '../components/Sidebar';
import DepartmentDropdown from '../components/DepartmentDropdown';
import styles from '../styles/CompanyUsersPage.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { updateUser } from '../features/users'; // Додано імпорт
import { User } from '../interfaces/User';
import { FaSync } from 'react-icons/fa'; // Додано імпорт іконки оновлення

const CompanyUsersPage: React.FC = () => {
    const companyId = localStorage.getItem('companyId');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string>('');

    const { users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useUsersByCompany(companyId || '', lastName);
    const { departments, loading: departmentsLoading, error: departmentsError } = useDepartments(companyId || '');

    const handleDeleteUser = () => {
        // Оновити список користувачів після видалення
        refetchUsers();
    };

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartmentId(event.target.value);
    };


    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleUpdateUser = async (userId: number, userData: Partial<User>) => {
        try {
            await updateUser(userId.toString(), userData); // Перетворення userId на строку
            refetchUsers(); // Оновлюємо список користувачів після оновлення
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleUpdateDepartment = (userId: number, departmentId: number) => {
        // Тут ми передаємо userId та об'єкт userData з властивістю department_id
        handleUpdateUser(userId, { department_id: departmentId });
    };

    const filteredUsers = users.filter(user => {
        const matchesDepartment = selectedDepartmentId ? user.department && String(user.department.department_id) === selectedDepartmentId : true;
        return matchesDepartment ;
    });

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
                            selectedDepartmentId={selectedDepartmentId !== null ? parseInt(selectedDepartmentId) : null}
                            onDepartmentChange={handleDepartmentChange}
                            className={styles.dropdown}
                        />
                    )}


                </div>
                {usersError ? (
                    <p>{usersError}</p>
                ) : (
                    <UserList
                        users={filteredUsers}
                        departments={departments}
                        onDelete={handleDeleteUser}
                        onUpdateUser={handleUpdateUser}
                        onUpdateDepartment={handleUpdateDepartment} // Використовуйте нову функцію
                    />
                )}
            </div>
        </div>
    );
};

export default CompanyUsersPage;



/*
// CompanyUsersPage.tsx
import React, { useState } from 'react';
import { useUsersByCompany } from '../hooks/useUsersByCompany';
import { useDepartments } from '../hooks/useDepartments';
import UserList from '../components/UserList';
import Sidebar from '../components/Sidebar';
import DepartmentDropdown from '../components/DepartmentDropdown';
import styles from '../styles/CompanyUsersPage.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { updateUser } from '../features/users'; // Додано імпорт
import { User } from '../interfaces/User';
import { FaSync } from 'react-icons/fa'; // Додано імпорт іконки оновлення

const CompanyUsersPage: React.FC = () => {
    const companyId = localStorage.getItem('companyId');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string>('');

    const { users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useUsersByCompany(companyId || '', lastName);
    const { departments, loading: departmentsLoading, error: departmentsError } = useDepartments(companyId || '');

    const handleDeleteUser = () => {
        // Оновити список користувачів після видалення
        refetchUsers();
    };

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartmentId(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleUpdateUser = async (userId: string, userData: Partial<User>) => { // Додано функцію оновлення користувача
        try {
            await updateUser(userId, userData);
            refetchUsers(); // Оновлюємо список користувачів після оновлення
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesDepartment = selectedDepartmentId ? user.department && String(user.department.department_id) === selectedDepartmentId : true;
        return matchesDepartment ;
    });

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

                    <FaSync className={styles.syncIcon}  />
                </div>
                {usersError ? (
                    <p>{usersError}</p>
                ) : (
                    <UserList
                        users={filteredUsers}
                        onDelete={handleDeleteUser}
                        onUpdateUser={handleUpdateUser} // Додано пропс для оновлення користувача
                    />
                )}
            </div>
        </div>
    );
};

export default CompanyUsersPage;
*/






/*
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

    const { users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useUsersByCompany(companyId || '', lastName);
    const { departments, loading: departmentsLoading, error: departmentsError } = useDepartments(companyId || '');

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartmentId(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleDeleteUser = () => {
        // Оновити список користувачів після видалення
        refetchUsers();
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
                    <UserList users={filteredUsers} onDelete={handleDeleteUser} />
                )}
            </div>
        </div>
    );
};

export default CompanyUsersPage;

*/