import React from 'react';
import { Company } from '../interfaces/Company';
import { FormattedMessage } from 'react-intl';
import Sidebar from './Sidebar';
import styles from '../styles/CompanySettingsForm.module.css';

interface Props {
    company: Company;
}

const CompanySettingsForm: React.FC<Props> = ({ company }) => {
    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainСontent}>
                <h2><FormattedMessage id="company.details" /></h2>
                <div className={styles.details}>
                    <p><strong><FormattedMessage id="registration.name" />:</strong> {company.name}</p>
                    <p><strong><FormattedMessage id="lR.email" />:</strong> {company.email}</p>
                    <p><strong><FormattedMessage id="company.address" />:</strong> {company.address || <FormattedMessage id="address.notProvided" />}</p>
                    <p><strong><FormattedMessage id="company.createdAt" />:</strong> {new Date(company.created_at).toLocaleString()}</p>
                    <p><strong><FormattedMessage id="company.status" />:</strong> {company.status?.name}</p>
                    <p><strong><FormattedMessage id="status.desc" />:</strong> {company.status?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CompanySettingsForm;


