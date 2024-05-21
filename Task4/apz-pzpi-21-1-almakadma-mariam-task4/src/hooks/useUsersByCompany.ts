// src/hooks/useUsersByCompany.ts

import { useState, useEffect } from 'react';
import { User } from '../interfaces/User';
import { getUsersByCompany } from '../features/users';

export const useUsersByCompany = (companyId: string, lastName: string) => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            setError('Company ID is missing');
            return;
        }

        const fetchUsers = async () => {
            try {
                const usersData = await getUsersByCompany(companyId, lastName);
                setUsers(usersData);
            } catch (error) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [companyId, lastName]);

    return { users, loading, error };
};
