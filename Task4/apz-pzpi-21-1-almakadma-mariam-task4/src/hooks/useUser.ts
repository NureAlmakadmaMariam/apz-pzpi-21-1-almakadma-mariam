// src/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { getUserById } from '../features/users';
import { User } from '../interfaces/User';

export const useUser = (user_id: number) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getUserById(user_id);
                setUser(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user_id]);


    return { user, loading, error };
};
