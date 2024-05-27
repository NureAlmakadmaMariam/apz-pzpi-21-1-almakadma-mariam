import React from 'react';
import { IntlProvider } from 'react-intl';
import { AuthProvider } from '../context/AuthContext';
import { useLocaleMessages } from '../hooks/useLocaleMessages';
import { AppRouter } from './router/AppRouter';
import styles from '../styles/App.module.css';

function App() {
    const { locale, messages, changeLocale } = useLocaleMessages('en');

    if (!messages) {
        return <div>Loading...</div>;
    }

    return (
        <AuthProvider>
            <IntlProvider locale={locale} messages={messages}>
                <div className={styles.appContainer}>
                    <div className={styles.languageSwitcher}>
                        <button onClick={() => changeLocale('en')}>English</button>
                        <button onClick={() => changeLocale('uk')}>Українська</button>
                    </div>
                    <AppRouter />
                </div>
            </IntlProvider>
        </AuthProvider>
    );
}

export default App;

