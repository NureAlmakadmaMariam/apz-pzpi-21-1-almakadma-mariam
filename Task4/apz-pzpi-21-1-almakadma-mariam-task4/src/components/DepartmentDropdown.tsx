// src/components/DepartmentDropdown.tsx

import React from 'react';
import { Department } from '../interfaces/Department';
import styles from '../styles/DepartmentDropdown.module.css';
import {FormattedMessage} from "react-intl";

interface DepartmentDropdownProps {
    departments: Department[];
    selectedDepartmentId: string | null;
    onDepartmentChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DepartmentDropdown: React.FC<DepartmentDropdownProps> = ({
                                                                   departments,
                                                                   selectedDepartmentId,
                                                                   onDepartmentChange,
                                                               }) => {
    return (
        <select
            value={selectedDepartmentId || ''}
            onChange={onDepartmentChange}
            className={styles.dropdown}
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
