// src/hooks/useTaskStatusReport.ts
import { useState, useEffect } from 'react';
import { getTaskStatusReport } from '../features/report';
import {TaskStatusReport } from '../interfaces/Report'

export const useTaskStatusReport = (companyId: number) => {
    const [data, setData] = useState<TaskStatusReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reportData = await getTaskStatusReport(companyId);
                setData(reportData);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [companyId]);

    return { data, loading, error };
};
