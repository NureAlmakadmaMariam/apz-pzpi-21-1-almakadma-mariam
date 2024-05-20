// src/pages/DashboardPage.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('DashboardPage must be used within an AuthProvider');
    }

    const { authState } = authContext;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Company ID: {authState.companyId}</p>
        </div>
    );
}

export default DashboardPage;
