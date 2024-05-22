import React, { useState } from 'react';
import DepartmentList from '../components/DepartmentList';
import SearchForm from '../components/SearchForm'; // Імпортуємо компонент SearchForm
import { useDepartments } from '../hooks/useDepartments';
import Sidebar from '../components/Sidebar';
import styles from "../styles/Departments.module.css";
import { Department } from '../interfaces/Department';
import CreateDepartmentForm from '../components/CreateDepartmentForm';
import {FormattedMessage} from "react-intl";

const DepartmentsPage: React.FC = () => {
    const companyId = parseInt(localStorage.getItem('companyId') || '0', 10); // Перетворення на число
    const [searchByName, setSearchByName] = useState<string>('');
    const [searchByContactPersonName, setSearchByContactPersonName] = useState<string>('');
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { departments, loading, error, refetchDepartments } = useDepartments(companyId.toString(), searchByName, searchByContactPersonName);

    const handleUpdateDepartments = () => {
        // Оновлення списку відділів
    };
    const handleUpdateDepartment = (departmentId: number, formData: Partial<Department>) => {
        // Реалізуйте оновлення окремого відділу на сервері за допомогою formData та departmentId
    };

    const handleCreateDepartment = () => {
        setShowCreateForm(true); // Показати форму для створення відділу
    };

    return (
        <div>
            <Sidebar />
            <div className={styles.mainContent}>
                <div>
                    <button onClick={handleCreateDepartment}>Add Department</button>
                    {showCreateForm && (
                        <CreateDepartmentForm
                            companyId={companyId}
                            onClose={() => setShowCreateForm(false)}
                            onSuccess={refetchDepartments}
                        />
                    )}

                    <DepartmentList departments={departments} onUpdate={handleUpdateDepartments} onUpdateDepartment={handleUpdateDepartment} />
                </div>
            </div>
        </div>
    );
};

export default DepartmentsPage;




/*
// src/pages/DepartmentsPage.tsx

import React, { useState } from 'react';
import DepartmentList from '../components/DepartmentList';
import SearchForm from '../components/SearchForm'; // Імпортуємо компонент SearchForm
import { useDepartments } from '../hooks/useDepartments';
import Sidebar from '../components/Sidebar';
import styles from "../styles/Departments.module.css";
import { Department } from '../interfaces/Department';
import CreateDepartmentForm from '../components/CreateDepartmentForm';

const DepartmentsPage: React.FC = () => {
    const companyId = localStorage.getItem('companyId') || '';
    const [searchByName, setSearchByName] = useState<string>('');
    const [searchByContactPersonName, setSearchByContactPersonName] = useState<string>('');
    const [showCreateForm, setShowCreateForm] = useState(false);

    const { departments, loading, error } = useDepartments(companyId, searchByName, searchByContactPersonName);

    const handleUpdateDepartments = () => {
        // Оновлення списку відділів
    };
    const handleUpdateDepartment = (departmentId: number, formData: Partial<Department>) => {
        // Реалізуйте оновлення окремого відділу на сервері за допомогою formData та departmentId
    };

    const handleCreateDepartment = () => {
        setShowCreateForm(true); // Показати форму для створення відділу
    };

    return (
        <div>
            <Sidebar />
            <div className={styles.mainContent}>
                <div>
                    <button onClick={handleCreateDepartment}>Add Department</button>
                    {showCreateForm && (
                        <CreateDepartmentForm companyId={companyId} onUpdate={handleUpdateDepartments} onClose={() => setShowCreateForm(false)} />
                    )}
                        <DepartmentList departments={departments} onUpdate={handleUpdateDepartments} onUpdateDepartment={handleUpdateDepartment} />
                </div>

            </div>
        </div>
    );
};

export default DepartmentsPage;





 */
