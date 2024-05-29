import { useState, useEffect } from 'react';
import { Reward } from '../interfaces/Reward';
import { getRewardsByDepartment, assignReward, markRewardAsRedeemed } from '../features/rewards';

export const useRewards = (departmentId: number | undefined) => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRewards = async () => {
        try {
            if (departmentId !== undefined) {
                const rewardsData = await getRewardsByDepartment(departmentId);
                setRewards(rewardsData);
            }
        } catch (error) {
            setError('Error fetching rewards');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRewards();
    }, [departmentId]);

    const assignUserReward = async (userId: number, rewardId: number) => {
        try {
            const result = await assignReward(userId, rewardId);
            return result;
        } catch (error) {
            if (error instanceof Error && error.message === 'Not enough points') {
                return { success: false, error: 'Not enough points' };
            }
            throw error;
        }
    };

    // Adding refetch function
    const refetch = async () => {
        setLoading(true);
        await fetchRewards();
    };
    const redeemUserReward = async (usersRewardId: number) => {
        try {
            const result = await markRewardAsRedeemed(usersRewardId);
            return result;
        } catch (error) {
            throw error;
        }
    };



    return { rewards, loading, error, assignUserReward, redeemUserReward, refetch };
};

