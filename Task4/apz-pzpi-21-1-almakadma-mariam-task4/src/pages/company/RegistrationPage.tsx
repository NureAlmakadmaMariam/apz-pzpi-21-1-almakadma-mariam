// src/pages/RegistrationPage.tsx
import React from 'react';
import RegistrationForm from '../../components/company/RegistrationForm';
import styles from '../../styles/LoginPage.module.css';
import {FormattedMessage} from "react-intl";

const RegistrationPage: React.FC = () => (
    <div>
        <h1 className={styles.loginHeader}><FormattedMessage id="registration.title" /></h1>
        <div className={styles.loginHeader}>
        <RegistrationForm />
        </div>
    </div>
);

export default RegistrationPage;
