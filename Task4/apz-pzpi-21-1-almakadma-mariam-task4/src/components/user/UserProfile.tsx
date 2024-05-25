// src/components/UserProfile.tsx
import React from 'react';
import { useUser } from '../../hooks/useUser';
import styles from '../../styles/UserProfile.module.css';
import {FormattedMessage} from "react-intl";

interface UserProfileProps {
    user_id: number;
}

const UserProfile: React.FC<UserProfileProps> = ({ user_id }) => {
    const { user, loading, error } = useUser(user_id);

    if (loading) return <p className={styles.loading}><FormattedMessage id="loading.title" /></p>;
    if (error) return <p className={styles.error}><FormattedMessage id= "error.title"/> {error}</p>;

    return (
        <div className={styles.userProfile}>
            <h2><FormattedMessage id= "user.profile"/></h2>

            {user ? (
                <>
                    <p><strong><FormattedMessage id= "user.FirstName"/>:</strong> {user.first_name}</p>
                    <p><strong><FormattedMessage id= "user.LastName"/>:</strong> {user.last_name}</p>
                    <p><strong><FormattedMessage id= "user.email"/>:</strong> {user.email}</p>
                    <p><strong><FormattedMessage id= "user.role"/>: </strong><FormattedMessage id={`${user.role}.position`} /></p>
                    <p><strong><FormattedMessage id= "department.name"/></strong>{user.department.name}</p>
                    <p><strong><FormattedMessage id=  "user.points"/></strong> {user.points}</p>
                    <p><strong><FormattedMessage id=  "user.startDate"/></strong> {new Date(user.start_date).toLocaleDateString()}</p>
                </>
            ) : (
                <p><FormattedMessage id= "user.notFound"/></p>
            )}
        </div>
    );
}

export default UserProfile;

