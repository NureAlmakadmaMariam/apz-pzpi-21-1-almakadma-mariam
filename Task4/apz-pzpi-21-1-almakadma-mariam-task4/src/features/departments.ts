// src/features/departments.ts

import axios from 'axios';

export const getDepartmentsByCompanyId = async (companyId: string) => {
    try {
        const response = await axios.get(`http://localhost:3500/department/company/${companyId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch departments:', error);
        throw new Error('Failed to fetch departments');
    }
};
