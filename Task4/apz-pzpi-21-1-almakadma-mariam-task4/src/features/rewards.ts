//features/reward.ts
import axios from 'axios';
import { Reward } from '../interfaces/Reward';

export const getRewardsByCompany = async (companyId: string): Promise<Reward[]> => {
    try {
        const response = await axios.get(`http://localhost:3500/reward/${companyId}`);
        return response.data.rewards;
    } catch (error) {
        throw new Error('Error fetching rewards');
    }
};

export const createReward = async (title: string, description: string, points_required: number, type: 'physical' | 'virtual', companyId: string): Promise<Reward> => {
    try {
        const response = await axios.post<Reward>(`http://localhost:3500/reward/${companyId}`, { title, description, points_required, type });
        return response.data;
    } catch (error) {
        throw new Error('Error creating reward');
    }
};