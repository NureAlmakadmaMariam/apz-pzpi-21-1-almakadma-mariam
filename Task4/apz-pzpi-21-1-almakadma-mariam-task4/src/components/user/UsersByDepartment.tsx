//User
import React, { useState } from 'react';
import { useUsersByDepartment } from '../../hooks/useUsersByDepartment';
import { User } from '../../interfaces/User';
import styles from '../../styles/UsersByDepartment.module.css';
import AddAchievementForm from './AddAchievementForm';
import RewardAssignmentForm from "./RewardAssignmentForm";
import { FormattedMessage } from 'react-intl';

interface UsersByDepartmentProps {
    department_id: number | null;
}

const UsersByDepartment: React.FC<UsersByDepartmentProps> = ({ department_id }) => {
    const { users, loading, error, refetch } = useUsersByDepartment(department_id);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [showRewardForm, setShowRewardForm] = useState(false); // Додано стан для відображення/приховування форми нагород


    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleToggleRewardForm = async () => {
        setShowRewardForm(!showRewardForm);
        // Після закриття форми нагороди оновлюємо список користувачів
        if (!showRewardForm) {
            await refetch();
        }
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
                    <button onClick={() => handleUserClick(user)}><FormattedMessage id="achievementOrReward.add" /></button>

                    <hr />

                    {selectedUser && selectedUser.user_id === user.user_id && (
                        <div className={styles.addAchievementForm}>
                            <h3><FormattedMessage id="achievement.addFor" /> {selectedUser.first_name} {selectedUser.last_name}</h3>
                            <AddAchievementForm user_id={selectedUser.user_id} />


                            <RewardAssignmentForm onClose={handleToggleRewardForm} user_id={user.user_id} />
                        </div>
                    )}


                </div>
            ))}
        </div>
    );


}

export default UsersByDepartment;