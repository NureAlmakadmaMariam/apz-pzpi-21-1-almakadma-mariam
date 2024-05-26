// src/features/users.ts
import axios from 'axios';
import { User } from '../interfaces/User';

export const getUsersByCompany = async (companyId: number, lastName: string = '') => {
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

export const deleteUser = async (userId: number) => {
    try {
        await axios.delete(`http://localhost:3500/users/${userId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to delete user:', error);
        throw new Error('Failed to delete user');
    }
};

export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
    try {
        const response = await axios.put(`http://localhost:3500/users/${userId}`, userData);
        return response.data.updatedUser;
    } catch (error) {
        console.error('Failed to update user:', error);
        throw new Error('Failed to update user');
    }
};

export const createUser = async (userData: Partial<User>): Promise<{ email: string, password: string }> => {
    try {
        const response = await axios.post('http://localhost:3500/users/', userData);
        const { email, password } = response.data.newUser;
        return { email, password };
    } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Failed to create user');
    }
};

export const getUserById = async (user_id: number): Promise<User> => {
    try {
        const response = await axios.get(`http://localhost:3500/users/${user_id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Axios error response:', error.response.data);
            throw new Error(error.response.data.message || 'Failed to fetch user data.');
        }
        console.error('Axios error:', error);
        throw new Error('Network error. Please try again later.');
    }
};

export const updateUserPassword = async (user_id: number, newPassword: string): Promise<void> => {
    await axios.put(`http://localhost:3500/users/${user_id}/password`, { newPassword });
};

export const getUsersByDepartment = async (department_id: number) => {
    try {
        const response = await axios.get(`http://localhost:3500/users/department/${department_id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};