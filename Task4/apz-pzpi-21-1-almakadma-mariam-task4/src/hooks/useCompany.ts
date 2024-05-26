// src/hooks/useCompany.ts
import { useState, useEffect } from 'react';
import { getCompanyById } from '../features/companySettings';
import { Company } from '../interfaces/Company';

export const useCompany = (companyId: number) => {
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (companyId === null) {
            setLoading(false);
            setError('Company ID is missing');
            return;
        }

        const fetchCompanyData = async () => {
            try {
                const companyData = await getCompanyById(companyId);
                setCompany(companyData);
            } catch (error) {
                setError('Failed to fetch company data');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [companyId]);

    return { company, loading, error };
};