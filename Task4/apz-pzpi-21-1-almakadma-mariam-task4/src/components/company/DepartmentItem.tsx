// src/components/DepartmentItem.tsx
import React, { useState } from 'react';
import { Department } from '../../interfaces/Department';
import styles from '../../styles/DepartmentList.module.css';
import { updateDepartment } from '../../features/departments';
import EditableField from './EditableField'; // Імпортуємо компонент EditableField
import { FaSave, FaTimes } from 'react-icons/fa';
import {FormattedMessage, useIntl} from "react-intl"; // Імпортуємо іконки

interface DepartmentItemProps {
    department: Department;
    onUpdate: () => void;
    onUpdateDepartment: (departmentId: number, formData: Partial<Department>) => void;
}

const DepartmentItem: React.FC<DepartmentItemProps> = ({ department, onUpdate, onUpdateDepartment }) => {
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({ ...department });

    const handleUpdateDepartment = async () => {
        console.log("Updating department...");
        try {
            await updateDepartment(
                department.department_id,
                formData.description,
                formData.department_code,
                formData.contact_person_name,
                formData.contact_person_email,
                formData.contact_person_phone
            );
            setEditing(false);
            onUpdate();
            onUpdateDepartment(department.department_id, formData);
        } catch (error) {
            console.error('Failed to update department:', error);
        }
    };

    const intl = useIntl();

    return (
        <div className={styles.departmentItemWrapper}>
            <div className={styles.departmentInfo}>
                <h2>{department.name}</h2>
                <p><FormattedMessage id="department.desc" />
                    <EditableField
                        value={formData.description || intl.formatMessage({ id: 'department.noInfo' })}
                        onSave={(newValue) => setFormData(prevState => ({ ...prevState, description: newValue }))}
                    />
                </p>
                <p><FormattedMessage id="department.code" />
                    <EditableField
                        value={formData.department_code || intl.formatMessage({ id: 'department.noInfo' })}
                        onSave={(newValue) => setFormData(prevState => ({ ...prevState, department_code: newValue }))}
                    />
                </p>
                <p><FormattedMessage id="department.contactP" />
                    <EditableField
                        value={formData.contact_person_name || intl.formatMessage({ id: 'department.noInfo' })}
                        onSave={(newValue) => setFormData(prevState => ({ ...prevState, contact_person_name: newValue }))}
                    />
                </p>
                <p><FormattedMessage id="department.email" />
                    <EditableField
                        value={formData.contact_person_email || intl.formatMessage({ id: 'department.noInfo' })}
                        onSave={(newValue) => setFormData(prevState => ({ ...prevState, contact_person_email: newValue }))}
                    />
                </p>
                <p><FormattedMessage id="department.phone" />
                    <EditableField
                        value={formData.contact_person_phone || intl.formatMessage({ id: 'department.noInfo' })}
                        onSave={(newValue) => setFormData(prevState => ({ ...prevState, contact_person_phone: newValue }))}
                    />
                </p>
            </div>
            {!editing ? (
                <button onClick={() => setEditing(true)}><FormattedMessage id="button.edit" /></button>
            ) : (
                <div className={styles.editingControls}>
                    <FaSave onClick={handleUpdateDepartment} className={styles.icon} />
                    <FaTimes onClick={() => setEditing(false)} className={styles.icon} />
                </div>
            )}
        </div>
    );
};

export default DepartmentItem;









