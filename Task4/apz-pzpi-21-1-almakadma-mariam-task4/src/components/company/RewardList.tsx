import React from 'react';
import { Reward } from '../../interfaces/Reward';
import styles from '../../styles/RewardList.module.css';
import {FormattedMessage} from "react-intl";

interface RewardListProps {
    rewards: Reward[];
}

const RewardList: React.FC<RewardListProps> = ({ rewards }) => {
    return (
        <div className={styles.rewardList}>
            {rewards.map(reward => (
                <div key={reward.reward_id} className={styles.rewardItem}>
                    <h3>{reward.title}</h3>
                    <p>{reward.description}</p>
                    <p><FormattedMessage id="reward.pointsReq" /> {reward.points_required}</p>
                    <p>
                        <FormattedMessage id="reward.type" /> <FormattedMessage id={`reward.${reward.type}`} />
                    </p>
                </div>
            ))}
        </div>
    );
};

export default RewardList;
