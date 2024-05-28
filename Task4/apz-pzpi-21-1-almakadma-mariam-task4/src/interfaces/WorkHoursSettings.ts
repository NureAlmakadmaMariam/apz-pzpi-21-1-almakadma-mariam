export interface WorkHoursSettings {
    setting_id: number;
    company_id: number;
    max_overtime_hours_per_day: number;
    overtime_notification_email?: string;
    work_days_per_month: number;
    hours_per_day: number;
}