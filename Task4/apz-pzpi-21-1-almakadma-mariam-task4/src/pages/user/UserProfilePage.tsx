// src/pages/UserProfilePage.tsx
import React from 'react';
import UserProfile from '../../components/user/UserProfile';
import { useAuth } from '../../hooks/useAuth';
import SidebarUser from "../../components/user/SidebarUser";
import UpdatePasswordForm from '../../components/user/UpdatePasswordForm';
import UserAchievements from '../../components/user/UserAchievements';
import styles from '../../styles/UserProfile.module.css'
import {FormattedMessage} from "react-intl";

const UserProfilePage: React.FC = () => {
    const { authState } = useAuth();

    if (!authState.user_id) {
        return <p><FormattedMessage id= "error.loginAgain"/></p>;
    }

    return (
        <div>
            <SidebarUser/>
            <div className={styles.mainContent}>
                <div className={styles.leftColumn}>
                    <UserProfile user_id={authState.user_id} />
                </div>
                <div className={styles.rightColumn}>
                    <UpdatePasswordForm user_id={authState.user_id} />
                </div>
            </div>
            <UserAchievements user_id={authState.user_id} />
        </div>
    );
}

export default UserProfilePage;

