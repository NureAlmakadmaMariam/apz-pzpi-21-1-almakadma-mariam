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
    };

    const handleCreateDepartment = () => {
        setShowCreateForm(true);
    };

    return (
        <div>
            <Sidebar />
            <div className={styles.mainContent}>
                <div>
                    <button onClick={handleCreateDepartment}><FormattedMessage id="dep.add" /></button>
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
