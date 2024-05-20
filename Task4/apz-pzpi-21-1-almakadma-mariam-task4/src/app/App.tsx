// src/app/App.tsx
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import { AuthProvider } from '../context/AuthContext';
import { AppRouter } from './router/AppRouter';

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
                <div>
                    <button onClick={() => setLocale('en')}>English</button>
                    <button onClick={() => setLocale('uk')}>Українська</button>
                </div>
                <AppRouter />
            </IntlProvider>
        </AuthProvider>
    );
}

export default App;
