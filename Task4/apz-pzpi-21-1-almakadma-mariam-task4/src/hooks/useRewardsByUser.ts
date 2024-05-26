// src/hooks/useRewardsByUser.ts
import { useState, useEffect } from 'react';
import { getRewardsByUserId } from '../features/usersAndRewards';
import { UsersReward } from '../interfaces/UsersReward';

export const useRewardsByUser = (userId: number) => {
    const [rewards, setRewards] = useState<UsersReward[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await getRewardsByUserId(userId);
                console.log('Response:', response);
                setRewards(response);
            } catch (error) {
                setError('Failed to load rewards');
            } finally {
                setLoading(false);
            }
        };

        fetchRewards();
    }, [userId]);

    return { rewards, loading, error };
};
