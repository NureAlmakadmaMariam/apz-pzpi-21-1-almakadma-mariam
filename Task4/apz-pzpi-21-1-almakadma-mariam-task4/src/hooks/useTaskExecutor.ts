// hooks/useTaskExecutor.ts
import { useState } from 'react';
import { createTaskExecutor, getTaskExecutorsByTaskId } from '../features/taskExecutors';
import { TaskExecutorData } from '../interfaces/TaskExecutorData';

export const useTaskExecutor = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [taskExecutors, setTaskExecutors] = useState<TaskExecutorData[]>([]); // Оновлено тип на TaskExecutorData[]

    const executeCreateTaskExecutor = async (taskExecutorData: TaskExecutorData) => {
        setLoading(true);
        setError(null);
        try {
            const createdTaskExecutor = await createTaskExecutor(taskExecutorData);
            setTaskExecutors([...taskExecutors, createdTaskExecutor]); // Додаємо нового виконавця до списку
        } catch (error) {
            setError('Failed to assign task to user');
        } finally {
            setLoading(false);
        }
    };

    const fetchTaskExecutorsByTaskId = async (taskId: number) => {
        setLoading(true);
        setError(null);
        try {
            const taskExecutorsData = await getTaskExecutorsByTaskId(taskId);
            setTaskExecutors(taskExecutorsData); // Встановлюємо отримані дані в стан
        } catch (error) {
            setError('Failed to fetch task executors by task ID');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, taskExecutors, executeCreateTaskExecutor, fetchTaskExecutorsByTaskId };
};