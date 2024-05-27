// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { getAllTasksAccessibleByUser, createTask } from '../features/tasks';
import { Task } from '../interfaces/Task';

export const useTasks = (userId: number) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            const tasksData = await getAllTasksAccessibleByUser(userId);
            setTasks(tasksData);
        } catch (error) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData: Partial<Task>) => {
        try {
            const newTask = await createTask(taskData);
            setTasks(prevTasks => [...prevTasks, newTask]);
        } catch (error) {
            setError('Failed to create task');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [userId]);

    return { tasks, loading, error, refetch: fetchTasks, addTask };
};


/*
// src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { getAllTasksAccessibleByUser } from '../features/tasks';
import { Task } from '../interfaces/Task';

export const useTasks = (userId: number) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = async () => {
        try {
            const tasksData = await getAllTasksAccessibleByUser(userId);
            setTasks(tasksData);
        } catch (error) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [userId]);

    return { tasks, loading, error, refetch: fetchTasks };
};
*/