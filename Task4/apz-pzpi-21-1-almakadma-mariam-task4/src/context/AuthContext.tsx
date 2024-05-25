// src/context/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { loginCompany as loginCompanyService, loginUser as loginUserService } from '../features/auth';
import { AuthResponse } from '../interfaces/AuthResponse';

interface AuthContextType {
    authState: AuthState;
    loginCompany: (email: string, password: string) => Promise<void>;
    loginUser: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

interface AuthState {
    companyId: number | null;
    user_id: number | null;
    role: 'employee' | 'manager' | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        companyId: null,
        user_id: null,
        role: null,
    });

    useEffect(() => {
        const storedCompanyId = localStorage.getItem('companyId');
        const storedUserData = localStorage.getItem('user');
        if (storedCompanyId) {
            setAuthState(prevState => ({
                ...prevState,
                companyId: Number(storedCompanyId),
            }));
        }
        if (storedUserData) {
            const userData: AuthState = JSON.parse(storedUserData);
            setAuthState(prevState => ({
                ...prevState,
                user_id: userData.user_id,
                role: userData.role,
            }));
        }
    }, []);

    const loginCompany = async (email: string, password: string) => {
        try {
            const data: AuthResponse = await loginCompanyService(email, password);
            localStorage.setItem('companyId', String(data.companyId));
            setAuthState({
                companyId: data.companyId || null,
                user_id: null,
                role: null,
            });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const loginUser = async (email: string, password: string) => {
        try {
            const data: AuthResponse = await loginUserService(email, password);
            localStorage.setItem('user', JSON.stringify(data));
            setAuthState({
                companyId: null,
                user_id: data.user_id || null,
                role: data.role || null,
            });
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };




    const logout = () => {
        setAuthState({
            companyId: null,
            user_id: null,
            role: null,
        });
        localStorage.removeItem('companyId');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ authState, loginCompany, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};


















/*
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
*/