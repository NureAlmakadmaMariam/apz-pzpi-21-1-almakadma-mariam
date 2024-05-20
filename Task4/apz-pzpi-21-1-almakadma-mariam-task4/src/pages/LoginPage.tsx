// src/pages/LoginPage.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import styles from '../styles/LoginPage.module.css';
import {FormattedMessage} from "react-intl";

const LoginPage: React.FC = () => (
    <div>
        <h1 className={styles.loginHeader}><FormattedMessage id="login.header" /></h1>
        <LoginForm />
    </div>
);

export default LoginPage;
