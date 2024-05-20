import React from 'react';
import CompanySettingsForm from '../components/CompanySettingsForm';
import { useCompany } from '../hooks/useCompany';

const CompanySettingsPage: React.FC = () => {
    const companyId = localStorage.getItem('companyId');

    // Хук викликається завжди, але обробка буде виконуватись лише за наявності companyId
    const { company, loading, error } = useCompany(companyId || '');

    if (!companyId) {
        return <div>Company ID not found in localStorage</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {company && <CompanySettingsForm company={company} />}
        </div>
    );
};

export default CompanySettingsPage;

