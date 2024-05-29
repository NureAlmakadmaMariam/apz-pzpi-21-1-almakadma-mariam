// src/interfaces/Company.ts
export interface Company {
    company_id: number;
    name: string;
    email: string;
    address: string;
    created_at: string;
    subscription: Subscription;
    status: Status;
}

export interface Subscription {
    name: string;
    description: string;
}

export interface Status {
    name: string;
    description: string;
}
