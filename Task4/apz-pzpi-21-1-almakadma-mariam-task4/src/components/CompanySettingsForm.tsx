import React from 'react';
import { Company } from '../interfaces/Company';
import {FormattedMessage} from "react-intl";

interface Props {
    company: Company;
}

const CompanySettingsForm: React.FC<Props> = ({ company }) => {
    return (
        <div>
            <h2><FormattedMessage id="company.details" /></h2>
            <div>
                <p><strong><FormattedMessage id="registration.name" />:</strong> {company.name}</p>
                <p><strong><FormattedMessage id="lR.email" />:</strong> {company.email}</p>
                <p><strong><FormattedMessage id="company.address" />:</strong> {company.address || <FormattedMessage id="address.notProvided" />}</p>
                <p><strong><FormattedMessage id="company.createdAt" />:</strong> {new Date(company.created_at).toLocaleString()}</p>
                <p><strong><FormattedMessage id="company.status" />:</strong> {company.status?.name}</p>
                <p><strong><FormattedMessage id="status.desc" />:</strong> {company.status?.description}</p>
            </div>
        </div>
    );
};

export default CompanySettingsForm;


