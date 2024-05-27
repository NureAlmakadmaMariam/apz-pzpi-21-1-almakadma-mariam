// src/components/TaskExecutorsList.tsx
import React, { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { TaskExecutorData } from '../../interfaces/TaskExecutorData';
import { useTaskExecutor } from '../../hooks/useTaskExecutor';

interface Props {
    taskId: number;
}

const TaskExecutorsList: React.FC<Props> = ({ taskId }) => {
    const { loading, error, taskExecutors, fetchTaskExecutorsByTaskId } = useTaskExecutor();

    useEffect(() => {
        fetchTaskExecutorsByTaskId(taskId);
    }, [taskId]);

    if (loading) return <p>Loading task executors...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h3><FormattedMessage id="task.executors" /></h3>
            <ul>
                {taskExecutors.map((executor: TaskExecutorData) => (
                    <li key={executor.executor_id}>
                        {executor.first_name} {executor.last_name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskExecutorsList;
