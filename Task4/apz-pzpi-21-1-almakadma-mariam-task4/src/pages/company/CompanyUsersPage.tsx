import React, { useState } from 'react';
import { useUsersByCompany } from '../../hooks/useUsersByCompany';
import { useDepartments } from '../../hooks/useDepartments';
import UserList from '../../components/company/UserList';
import Sidebar from '../../components/company/Sidebar';
import DepartmentDropdown from '../../components/company/DepartmentDropdown';
import styles from '../../styles/CompanyUsersPage.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { updateUser, createUser } from '../../features/users';
import { User } from '../../interfaces/User';
import { FaUserPlus } from 'react-icons/fa';
import CreateUserForm from '../../components/company/CreateUserForm';

const CompanyUsersPage: React.FC = () => {
    const companyId = parseInt(localStorage.getItem('companyId') || '0', 10);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string>('');
    const [showCreateUserForm, setShowCreateUserForm] = useState<boolean>(false);
    const [createdUserInfo, setCreatedUserInfo] = useState<{ email: string, password: string } | null>(null);

    const { users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useUsersByCompany(companyId, lastName);
    const { departments, loading: departmentsLoading, error: departmentsError } = useDepartments(companyId);


    const handleDeleteUser = () => {
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
            await updateUser(userId, userData);
            refetchUsers();
        } catch (error) {
            console.error('Failed to update user:', error);
        }
    };

    const handleUpdateDepartment = (userId: number, departmentId: number) => {
        handleUpdateUser(userId, { department_id: departmentId });
    };

    const handleCreateUser = async (userData: Partial<User>) => {
        try {
            const response = await createUser(userData);
            const { email, password } = response;
            if (email && password) {
                setCreatedUserInfo({ email, password });
            } else {
                console.error('Email or password not found in response');
            }
            setShowCreateUserForm(false);
        } catch (error) {
            console.error('Failed to create user:', error);
        }
        refetchUsers();
    };



    const filteredUsers = users.filter(user => {
        const matchesDepartment = selectedDepartmentId ? user.department && String(user.department.department_id) === selectedDepartmentId : true;
        return matchesDepartment;
    });

    const toggleCreateUserForm = () => {
        setShowCreateUserForm(!showCreateUserForm);
    };

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
                    <button onClick={toggleCreateUserForm}><FaUserPlus /> <FormattedMessage id="user.create" /></button>
                </div>
                {showCreateUserForm && (
                    <CreateUserForm departments={departments} onCreateUser={handleCreateUser} />
                )}
                {createdUserInfo && (
                    <div className={styles.createdUserMessage}>
                        <p><FormattedMessage id="user.created" values={{ email: createdUserInfo.email, password: createdUserInfo.password }} /></p>
                        <button onClick={() => navigator.clipboard.writeText(`Email: ${createdUserInfo.email}, Password: ${createdUserInfo.password}`)}>
                            <FormattedMessage id="user.copyDetails" />
                        </button>
                    </div>
                )}
                {usersError ? (
                    <p>{usersError}</p>
                ) : (
                    <UserList
                        users={filteredUsers}
                        departments={departments}
                        onDelete={handleDeleteUser}
                        onUpdateUser={handleUpdateUser}
                        onUpdateDepartment={handleUpdateDepartment}
                    />
                )}
            </div>
        </div>
    );
};

export default CompanyUsersPage;