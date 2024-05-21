// src/components/DeleteUserButton.tsx
import React from 'react';
import { User } from '../interfaces/User';
import { FormattedMessage } from 'react-intl';
import styles from '../styles/UserList.module.css';
import { deleteUser } from '../features/users'; // Імпортуємо функцію deleteUser

interface DeleteUserButtonProps {
    user: User;
    onDelete: () => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ user, onDelete }) => {
    const handleDelete = async () => {
        try {
            await deleteUser(user.user_id.toString());  // Викликаємо функцію для видалення користувача
            onDelete(); // Викликаємо колбек-функцію onDelete для оновлення списку користувачів
        } catch (error) {
            console.error('Failed to delete user:', error);
            // Обробка помилки видалення користувача
        }
    };

    return (
        <button onClick={handleDelete} className={styles.deleteButton}>
            <FormattedMessage id="user.delete" />
        </button>
    );
};

export default DeleteUserButton;

