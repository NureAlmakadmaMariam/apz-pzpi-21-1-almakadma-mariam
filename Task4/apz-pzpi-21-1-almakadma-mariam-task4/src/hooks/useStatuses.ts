// src/hooks/useStatuses.ts

import { useState, useEffect } from 'react';
import { getStatusesByType } from '../features/statuses';
import { Status } from '../interfaces/Status';

export const useStatuses = (type: 'user' | 'company') => {
    const [statuses, setStatuses] = useState<Status[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            setLoading(true);
            try {
                const data = await getStatusesByType(type);
                setStatuses(data);
            } catch (error) {
                setError('Failed to fetch statuses');
            } finally {
                setLoading(false);
            }
        };

        fetchStatuses();
    }, [type]);

    return { statuses, loading, error };
};
