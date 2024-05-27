// features/taskExecutors.ts
import axios from 'axios';
import { TaskExecutorData } from '../interfaces/TaskExecutorData';

export const createTaskExecutor = async (taskExecutorData: TaskExecutorData): Promise<any> => {
    try {
        const response = await axios.post('http://localhost:3500/taskExecutor/', taskExecutorData);
        return response.data;
    } catch (error) {
        throw 'Failed to create task executor';
    }
};

export const getTaskExecutorsByTaskId = async (taskId: number): Promise<any> => {
    try {
        const response = await axios.get(`http://localhost:3500/taskExecutor/${taskId}`);
        return response.data;
    } catch (error) {
        throw 'Failed to fetch task executors by task ID';
    }
};
