// src/hooks/useTasksByDepartment.ts
import { useState, useEffect } from 'react';
import { getAllTasksByDepartment } from '../features/tasks';
import { Task } from '../interfaces/Task';

export const useTasksByDepartment = (departmentId: number) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasksByDepartment = async () => {
        try {
            const tasksData = await getAllTasksByDepartment(departmentId);
            setTasks(tasksData);
        } catch (error) {
            setError('Failed to load tasks by department');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasksByDepartment();
    }, [departmentId]);

    return { tasks, loading, error, refetch: fetchTasksByDepartment };
};
