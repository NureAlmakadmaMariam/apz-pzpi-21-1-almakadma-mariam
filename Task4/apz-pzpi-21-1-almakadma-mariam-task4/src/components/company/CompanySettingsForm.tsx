// CompanySettingsForm.tsx
import React, { useState } from 'react';
import { Company } from '../../interfaces/Company';
import {FormattedMessage, useIntl} from 'react-intl';
import Sidebar from './Sidebar';
import styles from '../../styles/CompanySettingsForm.module.css';
import { FaInfoCircle } from 'react-icons/fa';
import { updateCompany } from '../../features/companySettings';
import { useCompany } from '../../hooks/useCompany';

interface Props {
    companyId: number;
}

const CompanySettingsForm: React.FC<Props> = ({ companyId }) => {
    const { company, loading, error } = useCompany(companyId);
    const intl = useIntl();
    const [editableFields, setEditableFields] = useState({
        name: false,
        address: false,
    });
    const [editedCompany, setEditedCompany] = useState<Company | null>(null);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    React.useEffect(() => {
        if (company) {
            setEditedCompany({ ...company });
        }
    }, [company]);

    if (loading) return <p><FormattedMessage id="loading.title" /></p>;
    if (error) return <p><FormattedMessage id="error.title" /> {error}</p>;
    if (!company) return null;

    const handleFieldClick = (field: string) => {
        setEditableFields({
            ...editableFields,
            [field]: true,
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setEditedCompany((prev) => ({
            ...prev!,
            [field]: e.target.value,
        }));
    };

    const handleSaveChanges = async () => {
        if (!editedCompany) return;

        try {
            await updateCompany(company.company_id, editedCompany.name, editedCompany.address);
            setUpdateMessage(intl.formatMessage({ id: 'company.update'}));
        } catch (error) {
            setUpdateMessage(intl.formatMessage({ id: 'company.FailedUpdate'}));
        } finally {
            setEditableFields({
                name: false,
                address: false,
            });
        }
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <h2><FormattedMessage id="company.details" /></h2>
                <div className={styles.details}>
                    <p onClick={() => handleFieldClick('name')}>
                        <strong><FormattedMessage id="registration.name" />: </strong>
                        {editableFields.name ? (
                            <input
                                type="text"
                                value={editedCompany?.name || ''}
                                onChange={(e) => handleInputChange(e, 'name')}
                            />
                        ) : (
                            <>
                                <span>{editedCompany?.name}</span>
                                <FaInfoCircle style={{ marginLeft: '5px', cursor: 'pointer' }} />
                            </>
                        )}
                    </p>
                    <p onClick={() => handleFieldClick('address')}>
                        <strong><FormattedMessage id="company.address" />: </strong>
                        {editableFields.address ? (
                            <input
                                type="text"
                                value={editedCompany?.address || ''}
                                onChange={(e) => handleInputChange(e, 'address')}
                            />
                        ) : (
                            <>
                                <span>{editedCompany?.address || <FormattedMessage id="address.notProvided" />}</span>
                                <FaInfoCircle style={{ marginLeft: '5px', cursor: 'pointer' }} />
                            </>
                        )}
                    </p>
                    <p><strong><FormattedMessage id="lR.email" />:</strong> {company.email}</p>
                    <p><strong><FormattedMessage id="company.createdAt" />:</strong> {new Date(company.created_at).toLocaleDateString()}</p>
                    <p><strong><FormattedMessage id="company.status" />:</strong> {company.status?.name}</p>
                </div>
                {editableFields.name || editableFields.address ? (
                    <button className={styles.sidebarButton} onClick={handleSaveChanges}><FormattedMessage id="button.saveChanges" /></button>
                ) : null}
                {updateMessage && <p>{updateMessage}</p>}
            </div>
        </div>
    );
};

export default CompanySettingsForm;




/*
//CompanySettingsForm.tsx
import React, { useState } from 'react';
import { Company } from '../../interfaces/Company';
import { FormattedMessage } from 'react-intl';
import Sidebar from './Sidebar';
import styles from '../../styles/CompanySettingsForm.css';
import { FaInfoCircle } from 'react-icons/fa';
import { updateCompany } from '../../features/companySettings'
import {useUser} from "../../hooks/useUser";

interface Props {
    company: Company;
}

const CompanySettingsForm: React.FC<Props> = ({ companyId }) => {
    const { company, loading, error } = useUser(companyId);

    if (loading) return <p><FormattedMessage id="loading.title" /></p>;
    if (error) return <p><FormattedMessage id= "error.title"/> {error}</p>;

    const [editableFields, setEditableFields] = useState({
        name: false,
        address: false
    });
    const [editedCompany, setEditedCompany] = useState({ ...company });
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    const handleFieldClick = (field: string) => {
        setEditableFields({
            ...editableFields,
            [field]: true
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setEditedCompany({
            ...editedCompany,
            [field]: e.target.value
        });
    };

    const handleSaveChanges = async () => {
        try {
            await updateCompany(company.company_id, editedCompany.name, editedCompany.address);
            setUpdateMessage('Company updated successfully');
        } catch (error) {
            setUpdateMessage('Failed to update company');
        } finally {
            setEditableFields({
                name: false,
                address: false
            });
        }
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainСontent}>
                <h2><FormattedMessage id="company.details" /></h2>
                <div className={styles.details}>
                    <p onClick={() => handleFieldClick('name')}>
                        <strong><FormattedMessage id="registration.name" />: </strong>
                        {editableFields.name ? (
                            <input
                                type="text"
                                value={editedCompany.name}
                                onChange={(e) => handleInputChange(e, 'name')}
                            />
                        ) : (
                            <>
                                <span>{editedCompany.name}</span>
                                <FaInfoCircle style={{ marginLeft: '5px', cursor: 'pointer' }} />
                            </>
                        )}
                    </p>
                    <p onClick={() => handleFieldClick('address')}>
                        <strong><FormattedMessage id="company.address" />: </strong>
                        {editableFields.address ? (
                            <input
                                type="text"
                                value={editedCompany.address}
                                onChange={(e) => handleInputChange(e, 'address')}
                            />
                        ) : (
                            <>
                                <span>{editedCompany.address || <FormattedMessage id="address.notProvided" />}</span>

                                <FaInfoCircle style={{ marginLeft: '5px', cursor: 'pointer' }} />
                            </>
                        )}
                    </p>
                    <p><strong><FormattedMessage id="lR.email" />:</strong> {company.email}</p>
                    <p><strong><FormattedMessage id="company.createdAt" />:</strong> {new Date(company.created_at).toLocaleString()}</p>
                    <p><strong><FormattedMessage id="company.status" />:</strong> {company.status?.name}</p>
                </div>
                {editableFields.name || editableFields.address ? (
                    <button className={styles.sidebarButton} onClick={handleSaveChanges}><FormattedMessage id="button.saveChanges" /></button>
                ) : null}
            </div>
        </div>
    );
};

export default CompanySettingsForm;
*/