// src/hooks/useUsersByCompany.ts

import { useState, useEffect } from 'react';
import { User } from '../interfaces/User';
import { getUsersByCompany } from '../features/users';

export const useUsersByCompany = (companyId: number, lastName: string) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const usersData = await getUsersByCompany(companyId, lastName);
            setUsers(usersData);
        } catch (error) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [companyId, lastName]);

    const refetch = () => {
        fetchUsers();
    };

    return { users, loading, error, refetch };
};
