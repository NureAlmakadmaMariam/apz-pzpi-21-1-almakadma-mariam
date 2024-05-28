// src/components/company/WorkHoursSettingsForm.tsx
import React, { useState, useEffect } from 'react';
import { useWorkHoursSettings } from '../../hooks/useWorkHoursSettings';
import { WorkHoursSettings } from '../../interfaces/WorkHoursSettings';
import { FormattedMessage } from 'react-intl';
import '../../styles/WorkHoursSettingsForm.css';

interface Props {
    companyId: number;
}

const WorkHoursSettingsForm: React.FC<Props> = ({ companyId }) => {
    const { loading, error, settings, fetchSettings, updateSettings, createSettings } = useWorkHoursSettings(companyId);
    const [formState, setFormState] = useState<Partial<WorkHoursSettings>>({
        company_id: companyId,
        max_overtime_hours_per_day: 0,
        overtime_notification_email: '',
        work_days_per_month: 0,
        hours_per_day: 0,
    });

    useEffect(() => {
        fetchSettings();
    }, [companyId]);

    useEffect(() => {
        if (settings.length > 0) {
            setFormState(settings[0]);
        }
    }, [settings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formState.setting_id) {
            await updateSettings(formState.setting_id, formState);
        } else {
            await createSettings(formState as WorkHoursSettings);
        }
    };

    return (
        <div className="form-container">
            <h2><FormattedMessage id="workHoursSettings" /></h2>
            {loading && <p className="loading-message"><FormattedMessage id="loading" /></p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="max_overtime_hours_per_day">
                        <FormattedMessage id="max_overtime_hours_per_day" />
                    </label>
                    <input
                        type="number"
                        id="max_overtime_hours_per_day"
                        name="max_overtime_hours_per_day"
                        value={formState.max_overtime_hours_per_day ?? ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="overtime_notification_email">
                        <FormattedMessage id="overtime_notification_email" />
                    </label>
                    <input
                        type="email"
                        id="overtime_notification_email"
                        name="overtime_notification_email"
                        value={formState.overtime_notification_email ?? ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="work_days_per_month">
                        <FormattedMessage id="work_days_per_month" />
                    </label>
                    <input
                        type="number"
                        id="work_days_per_month"
                        name="work_days_per_month"
                        value={formState.work_days_per_month ?? ''}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="hours_per_day">
                        <FormattedMessage id="hours_per_day" />
                    </label>
                    <input
                        type="number"
                        id="hours_per_day"
                        name="hours_per_day"
                        value={formState.hours_per_day ?? ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">
                    <FormattedMessage id={formState.setting_id ? 'update.button' : 'create.button'} />
                </button>
            </form>
        </div>
    );
};

export default WorkHoursSettingsForm;

