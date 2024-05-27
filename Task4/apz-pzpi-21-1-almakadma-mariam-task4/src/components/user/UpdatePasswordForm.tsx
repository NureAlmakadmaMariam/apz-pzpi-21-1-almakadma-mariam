// src/components/UpdatePasswordForm.tsx
import React, { useState } from 'react';
import { useUpdatePassword } from '../../hooks/useUpdatePassword';
import styles from '../../styles/UpdatePasswordForm.module.css';
import { FormattedMessage } from 'react-intl';

interface UpdatePasswordFormProps {
    user_id: number;
}

const UpdatePasswordForm: React.FC<UpdatePasswordFormProps> = ({ user_id }) => {
    const [newPassword, setNewPassword] = useState('');
    const { updatePassword, loading, error, success } = useUpdatePassword();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await updatePassword(user_id, newPassword);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.updatePasswordForm}>
            <h2><FormattedMessage id="updatePassword.title"/></h2>
            {error && <p className={styles.error}><FormattedMessage id="updatePassword.error" values={{ error }} /></p>}
            {success && <p className={styles.success}><FormattedMessage id="updatePassword.success"/></p>}
            <div>
                <label htmlFor="newPassword"><FormattedMessage id="updatePassword.newPassword"/></label>
                <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? <FormattedMessage id="updatePassword.loading"/> : <FormattedMessage id="updatePassword.title" />}
            </button>
        </form>
    );
}

export default UpdatePasswordForm;

