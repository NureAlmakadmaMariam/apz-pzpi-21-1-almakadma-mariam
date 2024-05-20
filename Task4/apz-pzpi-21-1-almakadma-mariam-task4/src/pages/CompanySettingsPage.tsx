// src/pages/CompanySettingsPage.tsx
import React, { useEffect, useState } from 'react';
import CompanySettingsForm from '../components/CompanySettingsForm';
import { getCompanyById } from '../features/companySettings';
import { Company } from '../interfaces/Company';

const CompanySettingsPage: React.FC = () => {
    const [company, setCompany] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const companyId = localStorage.getItem('companyId');
                if (!companyId) {
                    throw new Error('Company ID not found in localStorage');
                }
                const companyData = await getCompanyById(companyId);
                setCompany(companyData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch company data:', error);
            }
        };

        fetchCompanyData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Company Settings</h2>
            {company && <CompanySettingsForm company={company} />}
        </div>
    );
};

export default CompanySettingsPage;



