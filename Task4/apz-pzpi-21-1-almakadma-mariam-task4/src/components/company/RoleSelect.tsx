import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import { FormattedMessage } from "react-intl";
import styles from '../../styles/UserList.module.css';

interface RoleSelectProps {
    value: string;
    onSave: (newValue: string) => void;
}

const RoleSelect: React.FC<RoleSelectProps> = ({ value, onSave }) => {
    const [selectedRole, setSelectedRole] = useState(value || '');

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(event.target.value);
    };

    const handleSave = () => {
        onSave(selectedRole);
    };

    return (
        <div className={styles.editableField}>
            <select value={selectedRole} onChange={handleRoleChange}>
                <option value="employee"><FormattedMessage id="employee.position" /></option>
                <option value="manager"><FormattedMessage id="manager.position" /></option>
            </select>
            <FaSave className={styles.saveIcon} onClick={handleSave} /> {/* Замінюємо кнопку на іконку FaSave */}
        </div>
    );
};

export default RoleSelect;


