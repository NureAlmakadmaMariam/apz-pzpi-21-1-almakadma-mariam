// src/pages/DepartmentsPage.tsx

import React, { useState } from 'react';
import DepartmentList from '../components/DepartmentList';
import SearchForm from '../components/SearchForm'; // Імпортуємо компонент SearchForm
import { useDepartments } from '../hooks/useDepartments';
import Sidebar from '../components/Sidebar';
import styles from "../styles/Departments.module.css";
import { Department } from '../interfaces/Department';

const DepartmentsPage: React.FC = () => {
    const companyId = localStorage.getItem('companyId') || '';
    const [searchByName, setSearchByName] = useState<string>('');
    const [searchByContactPersonName, setSearchByContactPersonName] = useState<string>('');

    const { departments, loading, error } = useDepartments(companyId, searchByName, searchByContactPersonName);

    const handleUpdateDepartments = () => {
        // Оновлення списку відділів
    };
    const handleUpdateDepartment = (departmentId: number, formData: Partial<Department>) => {
        // Реалізуйте оновлення окремого відділу на сервері за допомогою formData та departmentId
    };

    return (
        <div>
            <Sidebar />
            <div className={styles.mainContent}>
                <div>
                        <DepartmentList departments={departments} onUpdate={handleUpdateDepartments} onUpdateDepartment={handleUpdateDepartment} />
                </div>

            </div>
        </div>
    );
};

export default DepartmentsPage;




