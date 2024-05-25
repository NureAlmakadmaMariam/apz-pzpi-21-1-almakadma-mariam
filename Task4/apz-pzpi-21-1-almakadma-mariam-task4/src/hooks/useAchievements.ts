// src/hooks/useAchievements.ts
import { useState, useEffect } from 'react';
import { getAchievementsByUser } from '../features/achievements';
import { Achievement } from '../interfaces/Achievement';

export const useAchievements = (user_id: number) => {
    const [achievements, setAchievements] = useState<Achievement[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const data = await getAchievementsByUser(user_id);
                setAchievements(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievements();
    }, [user_id]);

    return { achievements, loading, error };
};
