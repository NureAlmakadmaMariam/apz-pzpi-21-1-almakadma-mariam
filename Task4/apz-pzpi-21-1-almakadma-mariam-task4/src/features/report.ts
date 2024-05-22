// src/features/report.ts
import axios from 'axios';
import {TaskStatusReport} from '../interfaces/Report'

export const getTaskStatusReport = async (companyId: number): Promise<TaskStatusReport[]> => {
    const response = await axios.get<TaskStatusReport[]>(`http://localhost:3500/report/task-status/${companyId}`);
    return response.data;
};
