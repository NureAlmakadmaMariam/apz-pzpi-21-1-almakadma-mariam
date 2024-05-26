import React, { useState } from 'react';
import { Department } from '../../interfaces/Department';
import styles from '../../styles/CreateUserForm.module.css';
import { User } from '../../interfaces/User';
import {FormattedMessage, useIntl} from "react-intl";

interface CreateUserFormProps {
    departments: Department[];
    onCreateUser: (userData: Partial<User>) => Promise<void>;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ departments, onCreateUser }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | null>(null);

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDepartmentId(parseInt(event.target.value));
    };

    const intl = useIntl();

    const handleCreateUser = async () => {
        if (firstName && lastName && selectedDepartmentId !== null) {
            const newUser: Partial<User> = {
                first_name: firstName,
                last_name: lastName,
                department_id: selectedDepartmentId,
            };
            try {
                await onCreateUser(newUser);
                setFirstName('');
                setLastName('');
                setSelectedDepartmentId(null);
            } catch (error) {
                console.error('Failed to create user:', error);
            }
        } else {
            console.error('Failed to create user: Required fields are missing');
        }
    };

    return (
        <div className={styles.formContainer}>
            <input type="text" placeholder={intl.formatMessage({ id: 'user.FirstName' })} value={firstName} onChange={handleFirstNameChange} />
            <input type="text" placeholder={intl.formatMessage({ id: 'user.LastName' })} value={lastName} onChange={handleLastNameChange} />
            <select value={selectedDepartmentId || ''} onChange={handleDepartmentChange}>
                <option value=""><FormattedMessage id="department.select" /></option>
                {departments.map(department => (
                    <option key={department.department_id} value={department.department_id}>
                        {department.name}
                    </option>
                ))}
            </select>
            <button onClick={handleCreateUser}><FormattedMessage id="user.create" /></button>
        </div>
    );
};

export default CreateUserForm;


