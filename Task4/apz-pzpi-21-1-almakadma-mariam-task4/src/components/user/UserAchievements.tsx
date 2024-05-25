// src/components/UserAchievements.tsx
import React from 'react';
import { useAchievements } from '../../hooks/useAchievements';
import styles from '../../styles/UserAchievements.module.css';
import {FormattedMessage} from "react-intl";

interface UserAchievementsProps {
    user_id: number;
}

const UserAchievements: React.FC<UserAchievementsProps> = ({ user_id }) => {
    const { achievements, loading, error } = useAchievements(user_id);

    if (loading) return <p className={styles.loading}><FormattedMessage id="loading.title" /></p>;
    if (error) return <p className={styles.error}><FormattedMessage id= "error.title"/> {error}</p>;
    if (!achievements || achievements.length === 0) {
        return null;
    }

    return (
        <div className={styles.achievementsList}>
            <h2><FormattedMessage id= "myAchievement.title"/></h2>
            {achievements && achievements.length > 0 ? (
                <ul>
                    {achievements.map((achievement) => (
                        <li key={achievement.achievement_id}>
                            <h3>{achievement.title}</h3>
                            <p>{achievement.description}</p>
                            <p><FormattedMessage id= "achievement.pointsAwarded"/>: {achievement.points_awarded}</p>
                            <p><FormattedMessage id= "achievement.data"/>: {new Date(achievement.date_achieved).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p><FormattedMessage id= "achievement.noFound"/></p>
            )}
        </div>
    );
};

export default UserAchievements;
