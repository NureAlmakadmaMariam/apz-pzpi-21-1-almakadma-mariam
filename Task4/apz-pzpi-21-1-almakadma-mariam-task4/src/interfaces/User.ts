export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    password?: string;
    role: 'employee' | 'manager';
    department_id: number;
    start_date: string;
    updated_at: string;
    points: number;
    department: {
        department_id: number;
        name: string;
        department_code: string;
    };
    status: {
        status_id: number;
        name: string;
        description: string;
        type: 'user' | 'company';
    };
}
