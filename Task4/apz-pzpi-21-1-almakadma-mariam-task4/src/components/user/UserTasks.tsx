// src/components/UserTasks.tsx
import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { FormattedMessage } from "react-intl";
import '../../styles/UserTasks.css';

interface Props {
    userId: number | null;
}

const UserTasks: React.FC<Props> = ({ userId }) => {
    const { tasks, loading, error, refetch } = useTasks(userId || 0);

    if (loading) return <p><FormattedMessage id="loading.title" /></p>;
    if (error) return <p><FormattedMessage id="error.title" /> {error}</p>;

    return (
        <div>
            <button className="button-refresh" onClick={refetch}><FormattedMessage id="refresh.button" /></button>
            <ul className="user-tasks-list">
                {tasks.map(task => (
                    <li key={task.task_id} className="user-task-item">
                        <h3>{task.description}</h3>
                        <p><FormattedMessage id="task.deadline" /> {task.deadline}</p>
                        <p><FormattedMessage id="task.desc" /> {task.description}</p>
                        <p><FormattedMessage id="task.priority" /> <FormattedMessage id={`priority.${task.priority}`} /></p>
                        <p><FormattedMessage id="task.status" /> <FormattedMessage id={`status.${task.status}`} /></p>
                        <p><FormattedMessage id="task.createdAt" /> {task.created_at}</p>
                        <p><FormattedMessage id="task.updated" /> {task.updated_at}</p>

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserTasks;

