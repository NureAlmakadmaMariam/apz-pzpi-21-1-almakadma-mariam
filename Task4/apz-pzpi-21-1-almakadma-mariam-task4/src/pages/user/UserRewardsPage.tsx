// src/pages/UserRewardsPage.tsx
import React from 'react';
import UserRewards from '../../components/user/UserRewards';
import { useAuth } from '../../hooks/useAuth';
import SidebarUser from "../../components/user/SidebarUser";
import {FormattedMessage} from "react-intl";
const UserRewardsPage: React.FC = () => {
    const { authState } = useAuth();

    return (
        <div>
            <h1><FormattedMessage id= "user.rewardP"/></h1>
            <SidebarUser/>
            <UserRewards userId={authState.user_id} />
        </div>
    );
};

export default UserRewardsPage;
