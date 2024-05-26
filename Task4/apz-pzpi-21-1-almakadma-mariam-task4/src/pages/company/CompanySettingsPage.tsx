// CompanySettingsPage.tsx
import React from 'react';
import CompanySettingsForm from '../../components/company/CompanySettingsForm';
import { useAuth } from '../../hooks/useAuth';
import { FormattedMessage } from "react-intl";

const CompanySettingsPage: React.FC = () => {
    const { authState } = useAuth();

    if (!authState.companyId) {
        return <div><FormattedMessage id="company.notFound" /></div>;
    }

    return (
        <div>
            <CompanySettingsForm companyId={authState.companyId} />
        </div>
    );
};

export default CompanySettingsPage;