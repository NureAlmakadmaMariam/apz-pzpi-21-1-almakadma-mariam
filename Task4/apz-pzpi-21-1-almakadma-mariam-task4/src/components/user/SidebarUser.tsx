import React from 'react';
import { NavLink} from 'react-router-dom';
import '../../styles/Sidebar.css';
import {FormattedMessage} from "react-intl";
import {useAuth} from "../../hooks/useAuth";
import LogoutButton from "../LogoutCompButton";


const SidebarUser: React.FC = () => {
    const { authState } = useAuth();

    const isManager = authState.role === "manager";

    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <NavLink
                            to="/user-profile"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            <FormattedMessage id="user.profile" />
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/user-reward"
                            className={({ isActive }) => (isActive ? 'active-link' : '')}
                        >
                            <FormattedMessage id="user.rewardP" />
                        </NavLink>
                    </li>

                    {isManager && (
                        <li>
                            <NavLink
                                to="/manager-department"
                                className={({ isActive }) => (isActive ? 'active-link' : '')}
                            >
                                <FormattedMessage id="manager.section" />
                            </NavLink>
                        </li>
                    )}


                    <li>
                        <LogoutButton />
                    </li>

                </ul>
            </nav>
        </div>
    );
};

export default SidebarUser;