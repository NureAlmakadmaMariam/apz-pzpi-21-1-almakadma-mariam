// src/interfaces/AuthResponse.ts
export interface AuthResponse {
    message?: string;
    companyId?: number;
    user_id?: number;
    role?: 'employee' | 'manager';
}

/*
// src/interfaces/AuthResponse.ts
export interface AuthResponse {
    message: string;
    companyId: number;
    token: string;
}
 */