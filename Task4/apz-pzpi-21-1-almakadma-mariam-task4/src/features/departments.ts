// src/features/departments.ts

import axios from 'axios';

export const getDepartmentsByCompanyId = async (companyId: string, searchByName: string, searchByContactPersonName: string) => {
    try {
        const response = await axios.get(`http://localhost:3500/department/company/${companyId}`, {
            params: {
                searchByName,
                searchByContactPersonName
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch departments:', error);
        throw new Error('Failed to fetch departments');
    }
};

export const updateDepartment = async (
    departmentId: string,
    description: string,
    departmentCode: string,
    contactPersonName: string,
    contactPersonEmail: string,
    contactPersonPhone: string
) => {
    try {
        const response = await axios.put(`http://localhost:3500/department/${departmentId}`, {
            description,
            departmentCode,
            contactPersonName,
            contactPersonEmail,
            contactPersonPhone
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update department:', error);
        throw new Error('Failed to update department');
    }
};
