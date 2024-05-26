// src/hooks/useUpdateTask.ts
import { useState } from 'react';
import { updateTask } from '../features/tasks';
import { Task } from '../interfaces/Task';

export const useUpdateTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateTask = async (task_id: number, updateData: Partial<Task>) => {
        setLoading(true);
        setError(null);
        try {
            const updatedTask = await updateTask(task_id, updateData);
            setLoading(false);
            return updatedTask;
        } catch (error) {
            setError('Error updating task');
            setLoading(false);
            throw error;
        }
    };

    return { updateTask: handleUpdateTask, loading, error };
};
