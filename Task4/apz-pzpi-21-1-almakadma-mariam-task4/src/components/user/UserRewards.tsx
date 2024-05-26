import React from 'react';
import { useRewardsByUser } from '../../hooks/useRewardsByUser';
import { UsersReward } from '../../interfaces/UsersReward';
import '../../styles/UserRewards.css';
import {FormattedMessage} from "react-intl";

interface Props {
    userId: number | null;
}

const UserRewards: React.FC<Props> = ({ userId }) => {
    const { rewards, loading, error } = useRewardsByUser(userId || 0);

    if (loading) return <p><FormattedMessage id="loading.title" /></p>;
    if (error) return <p><FormattedMessage id= "error.title"/> {error}</p>;

    return (
        <div>
            <h2><FormattedMessage id= "user.rewardP"/></h2>
            <ul className="user-rewards-list">
                {rewards.map((userReward: UsersReward) => (
                    <li key={userReward.users_reward_id} className="user-reward-item">
                        <h3>{userReward.reward.title}</h3>
                        <p><FormattedMessage id= "rewardСА.desc"/> {userReward.reward.description || <FormattedMessage id="department.noInfo" />}</p>
                        <p><FormattedMessage id= "reward.pointsWasR"/> {userReward.reward.points_required}</p>
                        <p><FormattedMessage id= "reward.type"/> <FormattedMessage id={`reward.${userReward.reward.type}`} /></p>
                        <p><FormattedMessage id= "reward.redeemed"/>: {userReward.redeemed ? <FormattedMessage id= "yes"/> : <FormattedMessage id= "no"/>}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserRewards;




