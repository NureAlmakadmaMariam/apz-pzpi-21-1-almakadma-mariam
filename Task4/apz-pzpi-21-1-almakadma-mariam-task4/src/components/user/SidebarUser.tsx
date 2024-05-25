import React from 'react';
import { NavLink} from 'react-router-dom';
import '../../styles/Sidebar.css';
import {FormattedMessage} from "react-intl";


const SidebarUser: React.FC = () => {

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

                </ul>
            </nav>
        </div>
    );
};

export default SidebarUser;