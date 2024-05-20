// src/pages/RegistrationPage.tsx
import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import styles from '../styles/LoginPage.module.css';
import {FormattedMessage} from "react-intl";

const RegistrationPage: React.FC = () => (
    <div className={styles.loginHeader}>
        <h1><FormattedMessage id="registration.title" /></h1>
        <RegistrationForm />
    </div>
);

export default RegistrationPage;
