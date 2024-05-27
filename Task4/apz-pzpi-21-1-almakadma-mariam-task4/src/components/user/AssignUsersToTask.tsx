// src/components/user/AssignUsersToTask.tsx
import React, { useState } from 'react';
import { useUsersByDepartment } from '../../hooks/useUsersByDepartment';
import { createTaskExecutor } from '../../features/taskExecutors';
import { User } from '../../interfaces/User';
import { TaskExecutorData } from '../../interfaces/TaskExecutorData';
import {FormattedMessage, useIntl} from "react-intl";
import '../../styles/AssignUsersToTask.css';

interface Props {
    departmentId: number;
    taskId: number;
}

const AssignUsersToTask: React.FC<Props> = ({ departmentId, taskId }) => {
    const { users, loading, error } = useUsersByDepartment(departmentId);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const intl = useIntl();

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = e.target.value;
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter(id => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const handleSubmit = async () => {
        try {
            for (const selectedUser of selectedUsers) {
                const taskExecutorData: TaskExecutorData = {
                    executor_id: parseInt(selectedUser),
                    task_id: taskId
                };
                console.log('Creating task executor with data:', taskExecutorData);
                await createTaskExecutor(taskExecutorData);
            }
            const successMessage = intl.formatMessage({ id: 'userAs.successfully' });
            alert(successMessage);
        } catch (error) {
            console.error('Error assigning users to task:', error);
            const errorMessage = intl.formatMessage({ id: 'userAs.failed' });
            alert(errorMessage);
        }
    };


    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="assign-users-container">
            <h3 className="assign-users-header"><FormattedMessage id="userAs.select" /></h3>
            <select multiple value={selectedUsers} onChange={handleUserChange} className="assign-users-select">
                {users.map((user: User) => (
                    <option key={user.user_id} value={user.user_id.toString()}>{user.first_name} {user.last_name}</option>
                ))}
            </select>
            <button onClick={handleSubmit} className="assign-users-button"><FormattedMessage id="userAs.assign" /></button>
        </div>
    );
};

export default AssignUsersToTask;



