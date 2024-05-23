// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { loginCompany } from '../features/ auth';
import { AuthResponse } from '../interfaces/AuthResponse';

interface AuthContextType {
    authState: AuthState;
    login: (email: string, password: string) => Promise<void>;
}

interface AuthState {
    companyId: number | null;
    token: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({ companyId: null, token: null });

    // При монтуванні компоненту читаємо companyId з localStorage
    useEffect(() => {
        const storedCompanyId = localStorage.getItem('companyId');
        if (storedCompanyId) {
            setAuthState({ ...authState, companyId: Number(storedCompanyId) });
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const data: AuthResponse = await loginCompany(email, password);
            localStorage.setItem('companyId', String(data.companyId));
            setAuthState({ companyId: data.companyId, token: data.token });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ authState, login }}>
            {children}
        </AuthContext.Provider>
    );
};
