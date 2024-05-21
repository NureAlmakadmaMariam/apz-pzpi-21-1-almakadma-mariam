import React from 'react';
import { User } from '../interfaces/User';
import styles from '../styles/UserList.module.css';
import { FormattedMessage } from 'react-intl';

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    if (!users || users.length === 0) {
        return <div>No users available</div>;
    }

    return (
        <div className={styles.userList}>
            {users.map((user) => (
                <div key={user.user_id} className={styles.userCard}>
                    <p><strong><FormattedMessage id="user.name" /></strong> {user.first_name} {user.last_name}</p>
                    <p><strong><FormattedMessage id="user.email" /></strong> {user.email}</p>
                    <p><strong><FormattedMessage id="user.role" /> </strong> {user.role === 'manager' ? (
                        <FormattedMessage id="manager.position" />
                    ) : (
                        <FormattedMessage id="employee.position" />
                    )}
                    </p>
                    <p><strong><FormattedMessage id="department.name" /></strong> {user.department?.name }</p>
                    <p><strong><FormattedMessage id="department.code" /></strong> {user.department?.department_code}</p>
                    <p><strong><FormattedMessage id="user.startDate" /></strong> {new Date(user.start_date).toLocaleDateString()}</p>
                    <p><strong><FormattedMessage id="user.status" /></strong> {user.status?.name || <FormattedMessage id="status.no" />}</p>
                    <p><strong><FormattedMessage id="status.desc" />:</strong> {user.status?.description || <FormattedMessage id="status.descNo" />}</p>
                </div>
            ))}
        </div>
    );
};

export default UserList;


