import React, { useState } from 'react';
import { useUsersByDepartment } from '../../hooks/useUsersByDepartment';
import { User } from '../../interfaces/User';
import styles from '../../styles/UsersByDepartment.module.css';
import AddAchievementForm from './AddAchievementForm';
import { FormattedMessage } from 'react-intl';

interface UsersByDepartmentProps {
    department_id: number | null;
}

const UsersByDepartment: React.FC<UsersByDepartmentProps> = ({ department_id }) => {
    const { users, loading, error } = useUsersByDepartment(department_id);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    if (loading) return <p className={styles.loading}><FormattedMessage id="loading.title" /></p>;
    if (error) return <p className={styles.error}><FormattedMessage id="error.title" /> {error}</p>;

    return (
        <div className={styles.usersByDepartment}>
            <h2><FormattedMessage id="manager.section" /></h2>
            {users.map((user: User) => (
                <div key={user.user_id} className={styles.user}>
                    <p><strong><FormattedMessage id="user.name" /></strong> {user.first_name} {user.last_name}</p>
                    <p><strong><FormattedMessage id="user.email" />:</strong> {user.email}</p>
                    <p><strong><FormattedMessage id="user.role" />:</strong> <FormattedMessage id={`${user.role}.position`} /></p>
                    <p><strong><FormattedMessage id="user.points" /></strong> {user.points}</p>
                    <p><strong><FormattedMessage id="user.startDate" /></strong> {new Date(user.start_date).toLocaleDateString()}</p>
                    <button onClick={() => handleUserClick(user)}><FormattedMessage id="achievement.add" /></button>
                    <hr />
                    {selectedUser && selectedUser.user_id === user.user_id && (
                        <div className={styles.addAchievementForm}>
                            <h3><FormattedMessage id="achievement.addFor" /> {selectedUser.first_name} {selectedUser.last_name}</h3>
                            <AddAchievementForm user_id={selectedUser.user_id} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default UsersByDepartment;



/*
import React, { useState } from 'react';
import { useUsersByDepartment } from '../../hooks/useUsersByDepartment';
import { User } from '../../interfaces/User';
import styles from '../../styles/UsersByDepartment.module.css';
import AddAchievementForm from './AddAchievementForm';
import { FormattedMessage } from 'react-intl';

interface UsersByDepartmentProps {
    department_id: number | null;
}

const UsersByDepartment: React.FC<UsersByDepartmentProps> = ({ department_id }) => {
    const { users, loading, error } = useUsersByDepartment(department_id);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    if (loading) return <p className={styles.loading}><FormattedMessage id="loading.title" /></p>;
    if (error) return <p className={styles.error}><FormattedMessage id="error.title" /> {error}</p>;

    return (
        <div className={styles.usersByDepartment}>
            <h2><FormattedMessage id="manager.section" /></h2>
            {users.map((user: User) => (
                <div key={user.user_id} className={styles.user}>
                    <p><strong><FormattedMessage id="user.name" /></strong> {user.first_name} {user.last_name}</p>
                    <p><strong><FormattedMessage id="user.email" />:</strong> {user.email}</p>
                    <p><strong><FormattedMessage id="user.role" />:</strong> <FormattedMessage id={`${user.role}.position`} /></p>
                    <p><strong><FormattedMessage id="user.points" /></strong> {user.points}</p>
                    <p><strong><FormattedMessage id="user.startDate" /></strong> {new Date(user.start_date).toLocaleDateString()}</p>
                    <button onClick={() => handleUserClick(user)}>Add Achievement</button>
                    <hr />
                </div>
            ))}
            {selectedUser && (
                <div className={styles.addAchievementForm}>
                    <h3>Add Achievement for {selectedUser.first_name} {selectedUser.last_name}</h3>
                    <AddAchievementForm user_id={selectedUser.user_id} />
                </div>
            )}

        </div>
    );
}

export default UsersByDepartment;
*/