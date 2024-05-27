// src/components/TaskInfo.tsx
import React, { useState} from 'react';
import { FormattedMessage } from 'react-intl';
import { Task } from '../../interfaces/Task';
import CommentSection from './CommentSection';
import TaskExecutorsList from './TaskExecutorsList';

interface Props {
    task: Task;
    editTaskId: number | null;
    taskUpdates: Partial<Task>;
    handleEditClick: (task: Task) => void;
    handleUpdateClick: (task_id: number) => Promise<void>;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    toggleComments: (taskId: number) => void;
    commentState: { [key: number]: boolean };
}

const TaskInfo: React.FC<Props> = ({ task, editTaskId, taskUpdates, handleEditClick, handleUpdateClick, handleChange, toggleComments, commentState }) => {
    const [showTaskExecutors, setShowTaskExecutors] = useState(false);

    return (
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
                    <button onClick={() => handleEditClick(task)}>
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

            <button onClick={() => setShowTaskExecutors(!showTaskExecutors)}>
                {showTaskExecutors ? <FormattedMessage id="hide.executors" /> : <FormattedMessage id="show.executors" />}
            </button>
            {showTaskExecutors && <TaskExecutorsList taskId={task.task_id} />}

            <button onClick={() => toggleComments(task.task_id)}>
                {commentState[task.task_id] ?  <FormattedMessage id="comments.hide" /> :  <FormattedMessage id="comments.show" />}
            </button>
            {commentState[task.task_id] && <CommentSection taskId={task.task_id} />}
        </li>
    );
};

export default TaskInfo;
