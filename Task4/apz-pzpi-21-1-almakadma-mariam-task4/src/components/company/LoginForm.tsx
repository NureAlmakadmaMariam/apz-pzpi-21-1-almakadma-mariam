import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/LoginPage.module.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { loginCompany } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            await loginCompany(email, password);
            navigate('/company-settings');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            {error && <div className={styles.errorMessage}><FormattedMessage id="login.error" values={{ message: error }} /></div>}
            <div>
                <label><FormattedMessage id="lR.email" /></label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label><FormattedMessage id="lR.password" /></label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit"><FormattedMessage id="login.button" /></button>
        </form>
    );
};

export default LoginForm;
