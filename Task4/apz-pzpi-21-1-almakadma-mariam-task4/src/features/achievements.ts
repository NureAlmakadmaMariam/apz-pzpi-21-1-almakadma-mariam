// src/features/achievements.ts
import axios from 'axios';
import { Achievement } from '../interfaces/Achievement';

export const getAchievementsByUser = async (user_id: number): Promise<Achievement[]> => {
    try {
        const response = await axios.get<Achievement[]>(`http://localhost:3500/achievements/user/${user_id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching rewards');
    }
};
