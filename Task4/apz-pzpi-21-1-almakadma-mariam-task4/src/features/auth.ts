// src/features/auth.ts
import axios from 'axios';
import { AuthResponse } from '../interfaces/AuthResponse';
import {User} from "../interfaces/User";

export const loginCompany = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post('http://localhost:3500/company/login', { email, password });
        console.log('Login company response:', response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Axios error response:', error.response.data);
            throw new Error(error.response.data.message || 'Login failed. Please check your email and password.');
        }
        console.error('Axios error:', Error);
        throw new Error('Network error. Please try again later.');
    }
}

export const registerCompany = async (formData: any) => {
    try {
        const response = await axios.post('http://localhost:3500/company/register', formData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to register company: ' + Error.arguments);
    }
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post('http://localhost:3500/users/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};