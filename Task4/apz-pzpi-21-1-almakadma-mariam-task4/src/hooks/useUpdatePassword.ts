// src/hooks/useUpdatePassword.ts
import { useState } from 'react';
import { updateUserPassword } from '../features/users';

export const useUpdatePassword = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const updatePassword = async (user_id: number, newPassword: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await updateUserPassword(user_id, newPassword);
            setSuccess(true);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };


    return { updatePassword, loading, error, success };
};
