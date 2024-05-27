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

export const updateTask = async (task_id: number, updateData: Partial<Task>) => {
    try {
        const filteredUpdateData = {
            description: updateData.description,
            priority: updateData.priority,
            status: updateData.status,
            user_id: updateData.user_id,
            updated_at: new Date().toISOString(),
        };
        const response = await axios.put(`http://localhost:3500/task/${task_id}`, filteredUpdateData);
        return response.data;
    } catch (error) {
        throw new Error('Error update tasks');
    }
};

export const getAllTasksByDepartment = async (departmentId: number): Promise<Task[]> => {
    try {
        const response = await axios.get(`http://localhost:3500/task/departments/${departmentId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching tasks by department');
    }
};

export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
    try {
        const response = await axios.post('http://localhost:3500/task', taskData);
        return response.data.newTask;
    } catch (error) {
        throw new Error('Error creating task');
    }
};