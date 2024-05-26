// src/features/achievements.ts
import axios from 'axios';
import { Achievement } from '../interfaces/Achievement';

interface AchievementData {
    title: string;
    description: string;
    points_awarded: number | null;
    user_id: number;
}


export const getAchievementsByUser = async (user_id: number): Promise<Achievement[]> => {
    try {
        const response = await axios.get<Achievement[]>(`http://localhost:3500/achievements/user/${user_id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching rewards');
    }
};

export const createAchievement = async (achievementData: AchievementData) => {
    try {
        const response = await axios.post('http://localhost:3500/achievements', achievementData);
        return response.data;
    } catch (error) {
        throw new Error('Error creating achievement');
    }
};