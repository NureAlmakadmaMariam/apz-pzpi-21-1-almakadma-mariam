// src/app/router/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import DashboardPage from '../../pages/DashboardPage';
import RegistrationPage from '../../pages/RegistrationPage';
import CompanySettingsPage from "../../pages/CompanySettingsPage";
import CompanyUsersPage from "../../pages/CompanyUsersPage";
import DepartmentsPage from "../../pages/DepartmentsPage";
import TaskStatusReportPage from "../../pages/TaskStatusReportPage";
import RewardsPage from "../../pages/RewardsPage";

import UserLoginPage from "../../pages/UserLoginPage";
import UserProfilePage from "../../pages/UserProfilePage";
export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/company-settings" element={<CompanySettingsPage />} />
                <Route path="/company-users" element={<CompanyUsersPage />} />
                <Route path="/company-department" element={<DepartmentsPage />} />
                <Route path="/task-status-report" element={<TaskStatusReportPage />} />
                <Route path="/company-reward" element={<RewardsPage />} />
                <Route path="/login-user" element={<UserLoginPage />} />

                <Route path="/user-profile" element={<UserProfilePage />} />
            </Routes>
        </Router>
    );
}
