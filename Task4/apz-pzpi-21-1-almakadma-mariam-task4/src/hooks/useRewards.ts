import { useState, useEffect } from 'react';
import { Reward } from '../interfaces/Reward';
import { getRewardsByCompany } from '../features/rewards';

export const useRewards = (companyId: number) => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


        const fetchRewards = async () => {
            try {
                const rewardsData = await getRewardsByCompany(companyId);
                setRewards(rewardsData);
            } catch (error) {
                setError('Error fetching rewards');
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchRewards();
    }, [companyId]);

    const refetch = () => {
        fetchRewards();
    };

    return { rewards, loading, error, setRewards, refetch };
};

