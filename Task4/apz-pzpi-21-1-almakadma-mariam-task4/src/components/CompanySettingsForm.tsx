// src/components/CompanySettingsForm.tsx
import React from 'react';
import { Company } from '../interfaces/Company';

interface Props {
    company: Company;
}

const CompanySettingsForm: React.FC<Props> = ({ company }) => {
    return (
        <div>
            <h2>Company Details</h2>
            <div>
                <p><strong>Name:</strong> {company.name}</p>
                <p><strong>Email:</strong> {company.email}</p>
                <p><strong>Address:</strong> {company.address || 'Not provided'}</p>

                <p><strong>Created At:</strong> {company.created_at.toLocaleString()}</p>

                <p><strong>Status:</strong> {company.status?.name}</p>
                <p><strong>Status Description:</strong> {company.status?.description}</p>
            </div>
        </div>
    );
};


export default CompanySettingsForm;

