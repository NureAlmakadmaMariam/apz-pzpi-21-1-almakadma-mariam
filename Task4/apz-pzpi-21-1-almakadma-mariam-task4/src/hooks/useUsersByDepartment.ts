// src/hooks/useUsersByDepartment.ts
import { useState, useEffect } from 'react';
import { getUsersByDepartment } from '../features/users';
import { User } from '../interfaces/User';

export const useUsersByDepartment = (department_id: number | null): { users: User[], loading: boolean, error: string | null, refetch: () => Promise<void> } => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        if (department_id !== null) {
            try {
                const data = await getUsersByDepartment(department_id);
                setUsers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [department_id]);

    const refetch = async () => {
        setLoading(true);
        setError(null);
        await fetchUsers();
    };

    return { users, loading, error, refetch };
};