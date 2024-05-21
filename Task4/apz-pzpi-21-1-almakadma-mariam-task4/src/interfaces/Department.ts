// src/interfaces/Department.ts

export interface Department {
    department_id: number;
    name: string | null;
    description: string | null;
    department_code: string | null;
    contact_person_name: string | null;
    contact_person_email: string | null;
    contact_person_phone: string | null;
    company_id: number | null;
    created_at: Date;
    updated_at: Date;
}
