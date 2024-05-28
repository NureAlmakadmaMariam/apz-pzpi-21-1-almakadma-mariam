// src/hooks/useWorkHoursSettings.ts
import { useState, useEffect } from 'react';
import { getWorkHoursSettingsByCompanyId, updateWorkHoursSettings, createWorkHoursSettings } from '../features/workHoursSettings';
import {WorkHoursSettings} from '../interfaces/WorkHoursSettings'

export const useWorkHoursSettings = (company_id: number) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [settings, setSettings] = useState<WorkHoursSettings[]>([]);

    const fetchSettings = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getWorkHoursSettingsByCompanyId(company_id);
            setSettings(data);
        } catch (err) {
            setError('Failed to fetch work hours settings');
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (setting_id: number, updatedData: Partial<WorkHoursSettings>) => {
        setLoading(true);
        setError(null);
        try {
            const updatedSettings = await updateWorkHoursSettings(setting_id, updatedData);
            setSettings((prevSettings) => prevSettings.map((setting) =>
                setting.setting_id === setting_id ? updatedSettings : setting
            ));
        } catch (err) {
            setError('Failed to update work hours settings');
        } finally {
            setLoading(false);
        }
    };

    const createSettings = async (newData: WorkHoursSettings) => {
        setLoading(true);
        setError(null);
        try {
            const newSettings = await createWorkHoursSettings(newData);
            setSettings((prevSettings) => [...prevSettings, newSettings]);
        } catch (err) {
            setError('Failed to create work hours settings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [company_id]);

    return { loading, error, settings, fetchSettings, updateSettings, createSettings };
};
