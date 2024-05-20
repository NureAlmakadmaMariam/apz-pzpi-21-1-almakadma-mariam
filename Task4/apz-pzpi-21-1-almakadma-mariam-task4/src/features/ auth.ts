// src/features/auth.ts
export async function loginCompany(email: string, password: string) {
    const response = await fetch('http://localhost:3500/company/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}
