import React, { useState } from 'react';
import styles from '../../styles/EditableField.module.css';
import { FaSave } from 'react-icons/fa'; // Іконка для збереження

interface EditableFieldProps {
    value: string;
    onSave: (newValue: string) => void;
    className?: string; // Додано пропс для класу
}

const EditableField: React.FC<EditableFieldProps> = ({ value, onSave, className }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState(value);

    const handleSave = () => {
        console.log("New value:", newValue);
        onSave(newValue);
        setIsEditing(false);
    };


    return (
        <span className={`${styles.editableField} ${className}`}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                handleSave();
                            }
                        }}
                    />
                    <FaSave className={styles.saveIcon} onClick={handleSave} />
                </>
            ) : (
                <span onClick={() => setIsEditing(true)}>{value}</span>
            )}
        </span>
    );
};

export default EditableField;

