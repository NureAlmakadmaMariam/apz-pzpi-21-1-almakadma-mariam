// src/features/departments.ts

import axios from 'axios';
import {Department} from '../interfaces/Department'

export const getDepartmentsByCompanyId = async (companyId: number) => {
    try {
        const response = await axios.get(`http://localhost:3500/department/company/${companyId}`, {
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch departments:', error);
        throw new Error('Failed to fetch departments');
    }
};

export const updateDepartment = async (
    departmentId: number,
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

export const createDepartment = async (formData: Department) => {
    try {
        const response = await axios.post('http://localhost:3500/department/', formData);
        return response.data;
    } catch (error) {
        console.error('Failed to create department:', error);
        throw new Error('Failed to create department');
    }
};