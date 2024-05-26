// src/components/DepartmentList.tsx
import React from 'react';
import { Department } from '../../interfaces/Department';
import DepartmentItem from './DepartmentItem';
import styles from '../../styles/DepartmentList.module.css';
import {FormattedMessage} from "react-intl";

interface DepartmentListProps {
    departments: Department[];
    onUpdate: () => void;
    onUpdateDepartment: (departmentId: number, formData: Partial<Department>) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments, onUpdate, onUpdateDepartment }) => {
    return (
        <div className={styles.departmentList}>
            <h1><FormattedMessage id="company.department" /></h1>
            {departments.map((department) => (
                <DepartmentItem key={department.department_id} department={department} onUpdate={onUpdate} onUpdateDepartment={onUpdateDepartment} />
            ))}
        </div>
    );
};

export default DepartmentList;




