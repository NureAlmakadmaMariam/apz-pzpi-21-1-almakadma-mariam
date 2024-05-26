// src/hooks/useDepartments.ts

import { useState, useEffect, useCallback } from 'react';
import { getDepartmentsByCompanyId } from '../features/departments';
import { Department } from '../interfaces/Department';

export const useDepartments = (companyId: number) => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetchDepartments = useCallback(async () => {
        if (!companyId) {
            setLoading(false);
            setError('Company ID is missing');
            return;
        }

        try {
            setLoading(true);
            const departmentsData = await getDepartmentsByCompanyId(companyId);
            setDepartments(departmentsData);
            setError(null);
        } catch (error) {
            setError('Failed to fetch departments');
        } finally {
            setLoading(false);
        }
    }, [companyId]);

    useEffect(() => {
        refetchDepartments();
    }, [refetchDepartments]);

    return { departments, loading, error, refetchDepartments };
};



/*
// src/hooks/useDepartments.ts

import { useState, useEffect } from 'react';
import { getDepartmentsByCompanyId } from '../features/departments';
import { Department } from '../interfaces/Department';

export const useDepartments = (companyId: string, searchByName: string, searchByContactPersonName: string) => {
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
                const departmentsData = await getDepartmentsByCompanyId(companyId, searchByName, searchByContactPersonName); // Передавання параметрів пошуку
                setDepartments(departmentsData);
            } catch (error) {
                setError('Failed to fetch departments');
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, [companyId, searchByName, searchByContactPersonName]); // Додайте параметри пошуку до залежностей useEffect

    return { departments, loading, error };
};
*/
