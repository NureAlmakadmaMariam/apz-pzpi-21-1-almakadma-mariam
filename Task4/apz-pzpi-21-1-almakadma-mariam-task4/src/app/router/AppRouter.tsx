// src/app/router/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../../pages/company/LoginPage';
import RegistrationPage from '../../pages/company/RegistrationPage';
import CompanySettingsPage from "../../pages/company/CompanySettingsPage";
import CompanyUsersPage from "../../pages/company/CompanyUsersPage";
import DepartmentsPage from "../../pages/company/DepartmentsPage";
import TaskStatusReportPage from "../../pages/company/TaskStatusReportPage";
import RewardsPage from "../../pages/company/RewardsPage";
import UserRewardsPage from "../../pages/user/UserRewardsPage";
import UserLoginPage from "../../pages/user/UserLoginPage";
import UserProfilePage from "../../pages/user/UserProfilePage";
import UsersByDepartmentPage from "../../pages/user/UsersByDepartmentPage";
import UserTasksPage from "../../pages/user/UserTasksPage";
import TasksByDepartmentPage from "../../pages/user/TasksByDepartmentPage";
export const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/company-settings" element={<CompanySettingsPage />} />
                <Route path="/company-users" element={<CompanyUsersPage />} />
                <Route path="/company-department" element={<DepartmentsPage />} />
                <Route path="/task-status-report" element={<TaskStatusReportPage />} />
                <Route path="/company-reward" element={<RewardsPage />} />
                <Route path="/login-user" element={<UserLoginPage />} />

                <Route path="/user-profile" element={<UserProfilePage />} />
                <Route path="/manager-department" element={<UsersByDepartmentPage />} />
                <Route path="/user-reward" element={<UserRewardsPage />} />
                <Route path="/user-task" element={<UserTasksPage />} />
                <Route path="/manager-task" element={<TasksByDepartmentPage />} />

            </Routes>
        </Router>
    );
}
