import { useEffect, useState } from 'react';

export const useLocaleMessages = (initialLocale: string) => {
    const [locale, setLocale] = useState(initialLocale); // Початкова локаль
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

    const changeLocale = (newLocale: string) => {
        setLocale(newLocale);
    };



    return { locale, messages, changeLocale };
};
