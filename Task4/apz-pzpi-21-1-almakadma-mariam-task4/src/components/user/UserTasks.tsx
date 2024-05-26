// src/components/UserTasks.tsx
import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { FormattedMessage } from "react-intl";
import '../../styles/UserTasks.css';
import { Task } from '../../interfaces/Task';

interface Props {
    userId: number | null;
}

const UserTasks: React.FC<Props> = ({ userId }) => {
    const { tasks, loading, error, refetch } = useTasks(userId || 0);
    const { updateTask } = useUpdateTask();
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [taskUpdates, setTaskUpdates] = useState<Partial<Task>>({});

    const handleEditClick = (task: Task) => {
        setEditTaskId(task.task_id);
        setTaskUpdates(task);
    };

    const handleUpdateClick = async (task_id: number) => {
        await updateTask(task_id, taskUpdates);
        setEditTaskId(null);
        refetch();
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setTaskUpdates(prev => ({ ...prev, [name]: value }));
    };

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
                        {editTaskId === task.task_id ? (
                            <>
                                <label>
                                    <FormattedMessage id="task.priority" />
                                    <select name="priority" value={taskUpdates.priority} onChange={handleChange}>
                                        <option value="low"><FormattedMessage id="priority.low" /></option>
                                        <option value="medium"><FormattedMessage id="priority.medium" /></option>
                                        <option value="high"><FormattedMessage id="priority.high" /></option>
                                    </select>
                                </label>
                                <label>
                                    <FormattedMessage id="task.status" />
                                    <select name="status" value={taskUpdates.status} onChange={handleChange}>
                                        <option value="open"><FormattedMessage id="status.open" /></option>
                                        <option value="in_progress"><FormattedMessage id="status.in_progress" /></option>
                                        <option value="closed"><FormattedMessage id="status.closed" /></option>
                                        <option value="frozen"><FormattedMessage id="status.frozen" /></option>
                                    </select>
                                </label>
                                <button onClick={() => handleUpdateClick(task.task_id)}>
                                    <FormattedMessage id="update.button" />
                                </button>
                                <button onClick={() => setEditTaskId(null)}>
                                    <FormattedMessage id="cancel.button" />
                                </button>
                            </>
                        ) : (
                            <>
                                <p><FormattedMessage id="task.priority" /> <FormattedMessage id={`priority.${task.priority}`} /></p>
                                <p><FormattedMessage id="task.status" /> <FormattedMessage id={`status.${task.status}`} /></p>
                                <button onClick={() => handleEditClick(task)}>
                                    <FormattedMessage id="edit.button" />
                                </button>
                            </>
                        )}
                        <p><FormattedMessage id="task.createdAt" /> {task.created_at}</p>
                        <p><FormattedMessage id="task.updated" /> {task.updated_at}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserTasks;



/*
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
*/
