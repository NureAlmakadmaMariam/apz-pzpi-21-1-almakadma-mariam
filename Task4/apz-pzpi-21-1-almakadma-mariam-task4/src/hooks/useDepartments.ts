// src/hooks/useDepartments.ts

import { useState, useEffect, useCallback } from 'react'; // Додайте useCallback
import { getDepartmentsByCompanyId } from '../features/departments';
import { Department } from '../interfaces/Department';

export const useDepartments = (companyId: string, searchByName: string, searchByContactPersonName: string) => {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetchDepartments = useCallback(async () => { // Використайте useCallback для мемоізації функції
        if (!companyId) {
            setLoading(false);
            setError('Company ID is missing');
            return;
        }

        try {
            setLoading(true);
            const departmentsData = await getDepartmentsByCompanyId(companyId, searchByName, searchByContactPersonName); // Передавання параметрів пошуку
            setDepartments(departmentsData);
            setError(null);
        } catch (error) {
            setError('Failed to fetch departments');
        } finally {
            setLoading(false);
        }
    }, [companyId, searchByName, searchByContactPersonName]);

    useEffect(() => {
        refetchDepartments(); // Викликайте функцію refetchDepartments при кожному оновленні параметрів пошуку
    }, [refetchDepartments]);

    return { departments, loading, error, refetchDepartments }; // Додайте refetchDepartments в зворотне значення
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
