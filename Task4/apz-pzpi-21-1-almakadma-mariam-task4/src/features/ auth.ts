// src/features/auth.ts
import axios from 'axios';

export async function loginCompany(email: string, password: string) {
    try {
        const response = await axios.post('http://localhost:3500/company/login', {
            email,
            password
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to login: ' + Error.arguments);
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