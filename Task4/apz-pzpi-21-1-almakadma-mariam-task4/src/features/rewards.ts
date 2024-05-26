//features/reward.ts
import axios, { AxiosError } from 'axios';
import { Reward } from '../interfaces/Reward';

export const getRewardsByCompany = async (companyId: number): Promise<Reward[]> => {
    try {
        const response = await axios.get(`http://localhost:3500/reward/${companyId}`);
        return response.data.rewards;
    } catch (error) {
        throw new Error('Error fetching rewards');
    }
};

export const createReward = async (title: string, description: string, points_required: number, type: 'physical' | 'virtual', companyId: number): Promise<Reward> => {
    try {
        const response = await axios.post<Reward>(`http://localhost:3500/reward/${companyId}`, { title, description, points_required, type });
        return response.data;
    } catch (error) {
        throw new Error('Error creating reward');
    }
};

export const getRewardsByDepartment = async (departmentId: number): Promise<Reward[]> => {
    try {
        const response = await axios.get(`http://localhost:3500/reward/department/${departmentId}`);
        return response.data.rewards;
    } catch (error) {
        throw new Error('Error fetching rewards');
    }
};
export const assignReward = async (userId: number, rewardId: number) => {
    try {
        const response = await axios.post('http://localhost:3500/users-reward/assignReward', {
            user_id: userId,
            reward_id: rewardId,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response && axiosError.response.status === 400) {
                throw new Error('Not enough points');
            }
        }
        throw new Error('Error assigning rewards');
    }
};

export const markRewardAsRedeemed = async (usersRewardId: number) => {
    try {
        const response = await axios.put(`http://localhost:3500/users-reward/${usersRewardId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error marking rewards');
    }
};