// src/features/users.ts
import axios from 'axios';
import { User } from '../interfaces/User';

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

export const deleteUser = async (userId: string) => {
    try {
        await axios.delete(`http://localhost:3500/users/${userId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to delete user:', error);
        throw new Error('Failed to delete user');
    }
};

export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
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

