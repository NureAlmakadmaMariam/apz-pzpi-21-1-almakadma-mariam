import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/LogoutButton.module.css';

const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className={styles.logoutButtonContainer}>
            <button className={styles.logoutButton} onClick={handleLogout}>
                <FormattedMessage id="logout" />
            </button>
        </div>
    );
};

export default LogoutButton;



