// UserLoginPage.tsx

import React from 'react';
import LoginFormUser from '../../components/user/LoginFormUser';
import styles from "../../styles/LoginPage.module.css";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";

const UserLoginPage: React.FC = () => {
    return (
        <div>
            <h1 className={styles.loginHeader}><FormattedMessage id="loginUser.header" /></h1>
            <LoginFormUser />

            <div className={styles.registrationLink}>
                <Link to="/login"><FormattedMessage id="login.AsComp" /></Link>
            </div>
        </div>
    );
}

export default UserLoginPage;
