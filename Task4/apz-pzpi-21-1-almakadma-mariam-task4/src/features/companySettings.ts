// src/features/companySettings.ts

import axios from 'axios';

export const updateCompany = async (companyId: number, name: string, address: string) => {
    try {
        await axios.put(`http://localhost:3500/company/${companyId}`, { name, address });
        console.log('Company updated successfully');
    } catch (error) {
        console.error('Failed to update company:', error);
    }
};

export const getCompanyById = async (companyId: number) => {
    try {
        const response = await axios.get(`http://localhost:3500/company/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch company:', error);
        throw new Error('Failed to fetch company data');
    }
};