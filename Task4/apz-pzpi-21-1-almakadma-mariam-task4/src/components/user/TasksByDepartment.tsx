import React, { useState } from 'react';
import { useTasksByDepartment } from '../../hooks/useTasksByDepartment';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { FormattedMessage } from 'react-intl';
import '../../styles/UserTasks.css';
import { Task } from '../../interfaces/Task';
import TaskInfo from './TaskInfo';
import AssignUsersToTask from './AssignUsersToTask';

interface Props {
    departmentId: number;
}

const TasksByDepartment: React.FC<Props> = ({ departmentId }) => {
    const { tasks, loading, error, refetch } = useTasksByDepartment(departmentId);
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
                    <div key={task.task_id}>
                        <TaskInfo
                            task={task}
                            editTaskId={editTaskId}
                            taskUpdates={taskUpdates}
                            handleEditClick={handleEditClick}
                            handleUpdateClick={handleUpdateClick}
                            handleChange={handleChange}
                            toggleComments={toggleComments}
                            commentState={commentState}
                        />
                        <AssignUsersToTask departmentId={departmentId} taskId={task.task_id} />
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default TasksByDepartment;