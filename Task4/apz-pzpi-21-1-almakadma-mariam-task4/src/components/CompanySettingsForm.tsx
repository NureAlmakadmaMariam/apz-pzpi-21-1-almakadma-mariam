import React, { useState } from 'react';
import { Company } from '../interfaces/Company';
import { FormattedMessage } from 'react-intl';
import Sidebar from './Sidebar';
import styles from '../styles/CompanySettingsForm.module.css';
import { FaInfoCircle } from 'react-icons/fa'; // Імпортуються іконки з react-icons

interface Props {
    company: Company;
}

const CompanySettingsForm: React.FC<Props> = ({ company }) => {
    const [editableFields, setEditableFields] = useState({
        name: false,
        address: false
    });
    const [editedCompany, setEditedCompany] = useState({ ...company });

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

    const handleSaveChanges = () => {
        // Here you can add the logic to update the company data using the editedCompany object
        console.log('Saving changes:', editedCompany);
        // After saving changes, set editableFields to false to make the fields non-editable again
        setEditableFields({
            name: false,
            address: false
        });
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
                                {/* Значок інформації, який з'являється при наведенні миші */}
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
                                {/* Значок інформації, який з'являється при наведенні миші */}
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
