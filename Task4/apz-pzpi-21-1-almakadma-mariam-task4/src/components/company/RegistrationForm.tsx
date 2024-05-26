// src/components/RegistrationForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCompany } from '../../features/auth';
import styles from '../../styles/LoginPage.module.css';
import {FormattedMessage} from "react-intl";

const RegistrationForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await registerCompany({ name, email, password });
            navigate('/login');
        } catch (error) {
            console.error('Failed to register:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div>
                <label><FormattedMessage id="registration.name" /></label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label><FormattedMessage id="lR.email" /></label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label><FormattedMessage id="lR.password" /></label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit"><FormattedMessage id="register.submitB" /></button>
        </form>
    );
}

export default RegistrationForm;
