import React from 'react';
import { NavLink} from 'react-router-dom';
import '../../styles/Sidebar.css';
import {FormattedMessage} from "react-intl";
import LogoutButton from './LogoutCompButton';

const Sidebar: React.FC = () => {

    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/company-settings"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            <FormattedMessage id="company.sett" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/company-users"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            <FormattedMessage id="company.user" />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/company-department"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            <FormattedMessage id="company.department" />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/task-status-report"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            <FormattedMessage id="task.report" />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/company-reward"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            <FormattedMessage id="company.reward" />
                        </NavLink>
                    </li>
                    <li>
                            <LogoutButton />
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

