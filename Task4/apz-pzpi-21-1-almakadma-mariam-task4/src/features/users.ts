// src/features/users.ts
import axios from 'axios';

export const getUsersByCompany = async (companyId: string, lastName: string = '') => {
    try {
        const response = await axios.get(`http://localhost:3500/users/company/${companyId}`, {
            params: {
                last_name: lastName,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw new Error('Failed to fetch users');
    }
};