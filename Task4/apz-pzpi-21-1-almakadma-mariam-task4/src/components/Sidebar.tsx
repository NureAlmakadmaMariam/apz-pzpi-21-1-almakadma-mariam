import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';
import {FormattedMessage} from "react-intl";

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            Dashboard
                        </NavLink>
                    </li>
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
                            Company User
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;

