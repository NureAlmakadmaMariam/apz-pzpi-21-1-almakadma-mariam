import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { AuthProvider } from '../context/AuthContext';
import { AppRouter } from './router/AppRouter';
import styles from '../styles/App.module.css';

function App() {
    const [locale, setLocale] = useState('en'); // English as default
    const [messages, setMessages] = useState<{ [key: string]: string } | null>(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const loadedMessages = await import(`../../public/locales/${locale}/messages.json`);
                setMessages(loadedMessages.default);
            } catch (error) {
                console.error(`Failed to load messages for locale ${locale}:`, error);
            }
        };

        fetchMessages();
    }, [locale]);

    if (!messages) {
        return <div>Loading...</div>;
    }

    return (
        <AuthProvider>
            <IntlProvider locale={locale} messages={messages}>
                <div className={styles.appContainer}>
                    <div className={styles.languageSwitcher}>
                        <button onClick={() => setLocale('en')}>English</button>
                        <button onClick={() => setLocale('uk')}>Українська</button>
                    </div>
                    <AppRouter />
                </div>
            </IntlProvider>
        </AuthProvider>
    );
}

export default App;
