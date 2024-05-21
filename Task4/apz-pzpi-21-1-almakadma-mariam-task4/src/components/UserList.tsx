// src/components/UserList.tsx
import React from 'react';
import { User } from '../interfaces/User';
import styles from '../styles/UserList.module.css';
import { FormattedMessage } from 'react-intl';
import DeleteUserButton from './DeleteUserButton';

interface UserListProps {
    users: User[];
    onDelete: () => void; // Змінено тип onDelete на () => void
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
    if (!users || users.length === 0) {
        return <div><FormattedMessage id="users.noAvailable" /></div>;
    }

    return (
        <div className={styles.userList}>
            {users.map((user) => (
                <div key={user.user_id} className={styles.userCard}>
                    <p><strong><FormattedMessage id="user.name" /></strong> {user.first_name} {user.last_name}</p>
                    <p><strong><FormattedMessage id="user.email" /></strong> {user.email}</p>
                    <p><strong><FormattedMessage id="user.role" /></strong> {user.role}</p>
                    <p><strong><FormattedMessage id="department.name" /></strong> {user.department?.name || 'No department'}</p>
                    <p><strong><FormattedMessage id="department.code" /></strong> {user.department?.department_code || 'No department code'}</p>
                    <p><strong><FormattedMessage id="user.startDate" /></strong> {new Date(user.start_date).toLocaleDateString()}</p>
                    <p><strong><FormattedMessage id="user.status" /></strong> {user.status?.name || 'No status'}</p>
                    <p><strong><FormattedMessage id="status.desc" />:</strong> {user.status?.description || 'No description'}</p>
                    <DeleteUserButton user={user} onDelete={onDelete} /> {/* Передача колбека без параметрів */}
                </div>
            ))}
        </div>
    );
};

export default UserList;



