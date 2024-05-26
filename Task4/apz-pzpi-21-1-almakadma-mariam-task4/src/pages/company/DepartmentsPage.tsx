import React, { useState } from 'react';
import DepartmentList from '../../components/company/DepartmentList';

import { useDepartments } from '../../hooks/useDepartments';
import Sidebar from '../../components/company/Sidebar';
import styles from "../../styles/Departments.module.css";
import { Department } from '../../interfaces/Department';
import CreateDepartmentForm from '../../components/company/CreateDepartmentForm';
import {FormattedMessage} from "react-intl";

const DepartmentsPage: React.FC = () => {
    const companyId = parseInt(localStorage.getItem('companyId') || '0', 10);

    const [showCreateForm, setShowCreateForm] = useState(false);

    const { departments, loading, error, refetchDepartments } = useDepartments(companyId);

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
