export interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    role: 'employee' | 'manager';
    department_id: string;
    start_date: string;
    updated_at: string;
    status_id: string;
    points: number;
    department: {
        department_id: string;
        name: string;
        department_code: string;
    };
    status: {
        name: string;
        description: string;
        type: string;
    };
}
