// src/hooks/useDepartments.ts

import { useState, useEffect } from 'react';
import { getDepartmentsByCompanyId } from '../features/departments';
import { Department } from '../interfaces/Department';

export const useDepartments = (companyId: string) => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            setError('Company ID is missing');
            return;
        }

        const fetchDepartments = async () => {
            try {
                const departmentsData = await getDepartmentsByCompanyId(companyId);
                setDepartments(departmentsData);
            } catch (error) {
                setError('Failed to fetch departments');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, [companyId]);

    return { departments, loading, error };
};
