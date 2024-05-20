// src/app/router/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';
import RegistrationPage from '../../pages/RegistrationPage';
import CompanySettingsPage from "../../pages/CompanySettingsPage";

export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/company-settings" element={<CompanySettingsPage />} />
            </Routes>
        </Router>
    );
}
