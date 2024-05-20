// src/components/LoginForm.tsx
import React, { useState, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/LoginPage.module.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if (!authContext) {
        throw new Error('LoginForm must be used within an AuthProvider');
    }

    const { login } = authContext;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.loginForm}>
            {error && <div className={styles.errorMessage}><FormattedMessage id="login.error" values={{ message: error }} /></div>}
            <div>
                <label><FormattedMessage id="login.email" /></label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label><FormattedMessage id="login.password" /></label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit"><FormattedMessage id="login.button" /></button>
        </form>
    );
}

export default LoginForm;

