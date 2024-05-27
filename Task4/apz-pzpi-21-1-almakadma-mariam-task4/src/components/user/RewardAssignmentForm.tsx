// RewardAssignmentForm.tsx
import React, { useState } from 'react';
import { useRewards } from '../../hooks/useRewardsByD';
import { Reward } from '../../interfaces/Reward';
import { useAuth } from '../../hooks/useAuth';
import { FormattedMessage } from "react-intl";
import { useIntl } from 'react-intl';

interface RewardAssignmentFormProps {
    onClose: () => void;
    user_id: number | null;
}

const RewardAssignmentForm: React.FC<RewardAssignmentFormProps> = ({ onClose, user_id }) => {
    const { authState } = useAuth();
    const { department_id } = authState;
    const [message, setMessage] = useState<string | null>(null);

    const { rewards, loading, error, assignUserReward } = useRewards(department_id || undefined);
    const intl = useIntl();
    const handleAssignReward = async (rewardId: number) => {
        if (user_id) {
            try {
                const result = await assignUserReward(user_id, rewardId);
                if (!result.error) {
                    setMessage(intl.formatMessage({ id: 'reward.assignedSuccess'}));
                } else if (result.error && result.error === 'Not enough points') {
                    setMessage(intl.formatMessage({ id: 'reward.notEnoughPoints'}));
                }
                setTimeout(() => {
                    setMessage(null);
                    onClose();
                }, 3000);
            } catch (error) {
                console.error('Error assigning reward:', error);
                setMessage(intl.formatMessage({ id: 'reward.assignError'}));
                setTimeout(() => setMessage(null), 3000);
            }
        } else {
            console.error('User ID is null or undefined');
        }
    };

    return (
        <div>
            <h2><FormattedMessage id="reward.selectReward"/></h2>
            {loading && <p><FormattedMessage id="loading" /></p>}
            {error && <p><FormattedMessage id="error"/>: {error}</p>}
            {message && <p>{message}</p>}
            {rewards.map((reward: Reward) => (
                <div key={reward.reward_id}>
                    <p>{reward.title} - {reward.points_required} <FormattedMessage id="points"/></p>
                    <button onClick={() => handleAssignReward(reward.reward_id)}>
                        <FormattedMessage id="reward.assignButton" defaultMessage="Assign Reward" />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RewardAssignmentForm;



