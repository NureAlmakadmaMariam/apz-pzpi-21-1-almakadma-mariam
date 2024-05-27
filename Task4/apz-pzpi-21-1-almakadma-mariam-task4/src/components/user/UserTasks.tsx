//UserTasks.tsx
import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { FormattedMessage } from 'react-intl';
import '../../styles/UserTasks.css';
import { Task } from '../../interfaces/Task';
import TaskInfo from './TaskInfo';

interface Props {
    userId: number | null;
}

const UserTasks: React.FC<Props> = ({ userId }) => {
    const { tasks, loading, error, refetch } = useTasks(userId || 0);
    const { updateTask } = useUpdateTask();
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [taskUpdates, setTaskUpdates] = useState<Partial<Task>>({});
    const [showCommentsForTaskId, setShowCommentsForTaskId] = useState<number | null>(null);
    const [commentState, setCommentState] = useState<{ [key: number]: boolean }>({});

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

    const toggleComments = (taskId: number) => {
        setShowCommentsForTaskId(showCommentsForTaskId === taskId ? null : taskId);
        setCommentState(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
    };

    if (loading) return <p><FormattedMessage id="loading.title" /></p>;
    if (error) return <p><FormattedMessage id="error.title" /> {error}</p>;

    return (
        <div>
            <button className="button-refresh" onClick={refetch}><FormattedMessage id="refresh.button" /></button>
            <ul className="user-tasks-list">
                {tasks.map(task => (
                    <TaskInfo
                        key={task.task_id}
                        task={task}
                        editTaskId={editTaskId}
                        taskUpdates={taskUpdates}
                        handleEditClick={handleEditClick}
                        handleUpdateClick={handleUpdateClick}
                        handleChange={handleChange}
                        toggleComments={toggleComments}
                        commentState={commentState}
                    />
                ))}
            </ul>
        </div>
    );
};

export default UserTasks;



/*
import React, { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { FormattedMessage } from "react-intl";
import '../../styles/UserTasks.css';
import { Task } from '../../interfaces/Task';
import CommentSection from './CommentSection';

interface Props {
    userId: number | null;
}

const UserTasks: React.FC<Props> = ({ userId }) => {
    const { tasks, loading, error, refetch } = useTasks(userId || 0);
    const { updateTask } = useUpdateTask();
    const [editTaskId, setEditTaskId] = useState<number | null>(null);
    const [taskUpdates, setTaskUpdates] = useState<Partial<Task>>({});
    const [showCommentsForTaskId, setShowCommentsForTaskId] = useState<number | null>(null);
    const [commentState, setCommentState] = useState<{ [key: number]: boolean }>({});

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

    const toggleComments = (taskId: number) => {
        setShowCommentsForTaskId(showCommentsForTaskId === taskId ? null : taskId);
        setCommentState(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId] // Toggle the state for this task
        }));
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
                        <p><FormattedMessage id="task.deadline" /> {new Date(task.deadline).toLocaleDateString()}</p>
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
                        <p><FormattedMessage id="task.createdAt" />  {new Date(task.created_at).toLocaleDateString()}</p>
                        <p><FormattedMessage id="task.updated" /> {new Date(task.updated_at).toLocaleDateString() || ''}</p>
                        <button onClick={() => toggleComments(task.task_id)}>
                            {commentState[task.task_id] ? 'Hide Comments' : 'Show Comments'}
                        </button>
                        {commentState[task.task_id] && <CommentSection taskId={task.task_id} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserTasks;
*/