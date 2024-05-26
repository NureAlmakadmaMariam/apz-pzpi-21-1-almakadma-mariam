// src/features/tasks.ts
import axios from 'axios';
import { Task } from '../interfaces/Task';

export const getAllTasksAccessibleByUser = async (userId: number): Promise<Task[]> => {
    try {
        const response = await axios.get(`http://localhost:3500/taskExecutor/users/${userId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching tasks');
    }
};
