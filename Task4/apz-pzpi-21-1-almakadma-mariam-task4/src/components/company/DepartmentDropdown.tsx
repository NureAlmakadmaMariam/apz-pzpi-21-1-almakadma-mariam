// src/components/DepartmentDropdown.tsx

import React from 'react';
import { Department } from '../../interfaces/Department';
import { FormattedMessage } from 'react-intl';
import styles from '../../styles/DepartmentDropdown.module.css';

interface DepartmentDropdownProps {
    departments: Department[];
    selectedDepartmentId: number | null;
    onDepartmentChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({
                                                                   departments,
                                                                   selectedDepartmentId,
                                                                   onDepartmentChange,
                                                                   className, // Отримуємо параметр для класу стилів
                                                               }) => {
    // Додаємо клас стилів до основного класу стилів
    const dropdownClass = className ? `${styles.dropdown} ${className}` : styles.dropdown;

    return (
        <select
            value={selectedDepartmentId !== null ? selectedDepartmentId.toString() : ''}
            onChange={onDepartmentChange}
            className={dropdownClass} // Використовуємо об'єднаний клас стилів
        >
            <option value=""><FormattedMessage id="department.all" /></option>
            {departments.map(department => (
                <option key={department.department_id} value={department.department_id}>
                    {department.name}
                </option>
            ))}
        </select>
    );
};

export default DepartmentDropdown;