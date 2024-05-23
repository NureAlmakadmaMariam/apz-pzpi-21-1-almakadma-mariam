import { useState, useEffect } from 'react';
import { getUsersAndRewards } from '../features/usersAndRewards';
import { UsersReward } from '../interfaces/UsersReward';

export const useUsersAndRewards = (companyId: number) => {
    const [data, setData] = useState<UsersReward[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUsersAndRewards(companyId);
                setData(response.usersAndRewards);
            } catch (error) {
                setError('Failed to load data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [companyId]);

    return { data, loading, error };
};
