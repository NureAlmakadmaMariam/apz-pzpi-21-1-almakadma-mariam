// src/components/DeleteUserButton.tsx
import React from 'react';
import { User } from '../../interfaces/User';
import { FormattedMessage } from 'react-intl';
import styles from '../../styles/UserList.module.css';
import { deleteUser } from '../../features/users'; // Імпортуємо функцію deleteUser

interface DeleteUserButtonProps {
    user: User;
    onDelete: () => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ user, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteUser(user.user_id);
            onDelete();
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <button onClick={handleDelete} className={styles.deleteButton}>
            <FormattedMessage id="user.delete" />
        </button>
    );
};

export default DeleteUserButton;

