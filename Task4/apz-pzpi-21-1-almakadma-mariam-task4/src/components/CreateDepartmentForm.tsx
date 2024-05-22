import React, { useState } from 'react';
import { createDepartment } from '../features/departments';
import { Department } from '../interfaces/Department';

interface CreateDepartmentFormProps {
    companyId: number;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateDepartmentForm: React.FC<CreateDepartmentFormProps> = ({ companyId, onClose, onSuccess }) => {
    const initialFormData: Omit<Department, 'department_id'> = {
        name: '',
        description: '',
        department_code: '',
        contact_person_name: '',
        contact_person_email: '',
        contact_person_phone: '',
        company_id: companyId,
        created_at: new Date(),
        updated_at: new Date()
    };

    const [formData, setFormData] = useState<Omit<Department, 'department_id'>>(initialFormData);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("formData before creating department:", formData);
        try {
            console.log("companyId before creating department:", companyId);
            await createDepartment(formData as Department);

            onSuccess();
            onClose();
            setFormData(initialFormData);
        } catch (error) {
            console.error('Failed to create department:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Department Name" required />
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" />
            <input type="text" name="department_code" value={formData.department_code} onChange={handleInputChange} placeholder="Department Code" />
            <input type="text" name="contact_person_name" value={formData.contact_person_name} onChange={handleInputChange} placeholder="Contact Person Name" />
            <input type="email" name="contact_person_email" value={formData.contact_person_email} onChange={handleInputChange} placeholder="Contact Person Email" />
            <input type="text" name="contact_person_phone" value={formData.contact_person_phone} onChange={handleInputChange} placeholder="Contact Person Phone" />
            <button type="submit">Create Department</button>
        </form>
    );
};

export default CreateDepartmentForm;




