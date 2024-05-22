// src/interfaces/Department.ts

export interface Department {
    department_id: number;
    name: string;
    description: string;
    department_code: string;
    contact_person_name: string;
    contact_person_email: string;
    contact_person_phone: string;
    company_id: number;
    created_at: Date;
    updated_at: Date;
}
