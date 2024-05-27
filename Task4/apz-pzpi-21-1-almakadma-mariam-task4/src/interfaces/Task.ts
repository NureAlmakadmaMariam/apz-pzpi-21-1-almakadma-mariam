// src/interfaces/Task.ts
export interface TaskExecutor {
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string | null;
    role: 'employee' | 'manager';
    department_id: number;
    start_date: string;
    updated_at: string;
    status_id: number;
    points: number;
}

export interface Task {
    task_id: number;
    description: string;
    deadline: string;
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'closed' | 'in_progress' | 'frozen';
    user_id: number | null;
    updated_at: string;
    created_at: string;
    executors: TaskExecutor[];
}
