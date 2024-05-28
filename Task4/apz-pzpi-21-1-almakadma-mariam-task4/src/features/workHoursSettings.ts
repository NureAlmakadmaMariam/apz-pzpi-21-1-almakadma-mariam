// src/features/workHoursSettings.ts
import axios from 'axios';
import {WorkHoursSettings} from '../interfaces/WorkHoursSettings'

export const getWorkHoursSettingsByCompanyId = async (company_id: number): Promise<WorkHoursSettings[]> => {
    try {
        const response = await axios.get<WorkHoursSettings[]>(`http://localhost:3500/wHS/${company_id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching work hours settings');
    }
};

export const updateWorkHoursSettings = async (setting_id: number, data: Partial<WorkHoursSettings>): Promise<WorkHoursSettings> => {
    try {
        const response = await axios.put<WorkHoursSettings>(`http://localhost:3500/wHS/${setting_id}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error update work hours settings');
    }
};

export const createWorkHoursSettings = async (data: WorkHoursSettings): Promise<WorkHoursSettings> => {
    try {
        const response = await axios.post<WorkHoursSettings>('http://localhost:3500/wHS/', data);
        return response.data;
    } catch (error) {
        throw new Error('Error create work hours settings');
    }

};
