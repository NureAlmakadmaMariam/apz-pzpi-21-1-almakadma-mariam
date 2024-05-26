// LoginFormUser.tsx
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from '../../styles/LoginPage.module.css';

const LoginFormUser: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { loginUser } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        try {
            await loginUser(email, password);
            navigate('/user-profile');
        } catch (err) {
            setError(Error.arguments);
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
}

export default LoginFormUser;
