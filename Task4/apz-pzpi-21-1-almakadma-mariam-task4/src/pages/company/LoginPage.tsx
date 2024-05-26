// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../../components/company/LoginForm';
import styles from '../../styles/LoginPage.module.css';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => (
    <div>
        <h1 className={styles.loginHeader}><FormattedMessage id="login.header" /></h1>
        <LoginForm />
        <div className={styles.registrationLink}>
            <span><FormattedMessage id="login.registrationPrompt" /> </span>
            <Link to="/registration"><FormattedMessage id="login.registrationLink" /></Link>
        </div>

        <div className={styles.registrationLink}>
            <Link to="/login-user"><FormattedMessage id="login.AsUser" /></Link>
        </div>

    </div>
);

export default LoginPage;
