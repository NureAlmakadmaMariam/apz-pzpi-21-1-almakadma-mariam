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
    department_id: number | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        companyId: null,
        user_id: null,
        role: null,
        department_id: null,
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
                department_id: userData.department_id,
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
                department_id: null,
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
                department_id: data.department_id || null,
            });
            console.log("Department ID:", data.department_id);
            console.log("User ID:", data.user_id);
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
            department_id: null,
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

