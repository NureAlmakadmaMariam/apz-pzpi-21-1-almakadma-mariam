// src/components/CreateTask.tsx
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useTasks } from '../../hooks/useTasks';
import { Task } from '../../interfaces/Task';
import LocalizedDatePicker from './LocalizedDatePicker';
import '../../styles/CreateTask.css';

const CreateTask: React.FC<{ userId: number }> = ({ userId }) => {
    const { addTask } = useTasks(userId);
    const [taskData, setTaskData] = useState<Partial<Task>>({
        description: '',
        priority: 'low',
        deadline: '',
        user_id: userId,
    });
    const intl = useIntl();
    const currentLocale = intl.locale as 'en' | 'uk';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskData(prev => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date: Date | null) => {
        setTaskData(prev => ({ ...prev, deadline: date ? date.toISOString().split('T')[0] : '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTask(taskData);
        setTaskData({ description: '', priority: 'low', user_id: userId });
    };

    return (
        <form className="create-task-form" onSubmit={handleSubmit}>
            <label>
                <FormattedMessage id="task.desc" />
                <input type="text" name="description" value={taskData.description || ''} onChange={handleChange} required />
            </label>
            <label>
                <FormattedMessage id="task.priority" />
                <select name="priority" value={taskData.priority} onChange={handleChange}>
                    <option value="low"><FormattedMessage id="priority.low" /></option>
                    <option value="medium"><FormattedMessage id="priority.medium" /></option>
                    <option value="high"><FormattedMessage id="priority.high" /></option>
                </select>
            </label>
            <label>
                <FormattedMessage id="task.deadline" />
                <LocalizedDatePicker
                    selected={taskData.deadline ? new Date(taskData.deadline) : null}
                    onChange={handleDateChange}
                    locale={currentLocale}
                />
            </label>
            <button type="submit"><FormattedMessage id="create.button" /></button>
        </form>
    );
};

export default CreateTask;