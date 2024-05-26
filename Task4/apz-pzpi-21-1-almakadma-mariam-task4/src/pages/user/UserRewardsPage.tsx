// src/pages/UserRewardsPage.tsx
import React from 'react';
import UserRewards from '../../components/user/UserRewards';
import { useAuth } from '../../hooks/useAuth';
import SidebarUser from "../../components/user/SidebarUser";
const UserRewardsPage: React.FC = () => {
    const { authState } = useAuth();

    return (
        <div>
            <h1>My Rewards</h1>
<SidebarUser/>
            <UserRewards userId={authState.user_id} />
        </div>
    );
};

export default UserRewardsPage;
