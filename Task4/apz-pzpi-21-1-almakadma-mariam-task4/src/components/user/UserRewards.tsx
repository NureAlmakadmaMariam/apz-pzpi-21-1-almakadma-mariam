import React from 'react';
import { useRewardsByUser } from '../../hooks/useRewardsByUser';
import { UsersReward } from '../../interfaces/UsersReward';
import {useRewards } from '../../hooks/useRewardsByD'
import '../../styles/UserRewards.css';
import {FormattedMessage} from "react-intl";

interface Props {
    userId: number | null;
}

const UserRewards: React.FC<Props> = ({ userId }) => {
    const { rewards, loading, error, refetch} = useRewardsByUser(userId || 0);
    const { redeemUserReward} = useRewards(userId || 0);
    const handleRedeemReward = async (usersRewardId: number) => {
        try {
            await redeemUserReward(usersRewardId);
            refetch();
        } catch (error) {
            console.error('Error redeeming reward:', error);
        }
    };

    if (loading) return <p><FormattedMessage id="loading.title" /></p>;
    if (error) return <p><FormattedMessage id= "error.title"/> {error}</p>;

    return (
        <div>
            <ul className="user-rewards-list">
                {rewards.map((userReward: UsersReward) => (
                    <li key={userReward.users_reward_id} className="user-reward-item">
                        <h3>{userReward.reward.title}</h3>
                        <p><FormattedMessage id= "rewardСА.desc"/> {userReward.reward.description || <FormattedMessage id="department.noInfo" />}</p>
                        <p><FormattedMessage id= "reward.pointsWasR"/> {userReward.reward.points_required}</p>
                        <p><FormattedMessage id= "reward.type"/> <FormattedMessage id={`reward.${userReward.reward.type}`} /></p>
                        <p><FormattedMessage id= "reward.redeemed"/>: {userReward.redeemed ? <FormattedMessage id= "yes"/> : <FormattedMessage id= "no"/>}</p>
                        {/* Add redeem button */}
                        {!userReward.redeemed && (
                            <button onClick={() => handleRedeemReward(userReward.users_reward_id)}>
                                <FormattedMessage id="redeem.button"/>
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserRewards;
