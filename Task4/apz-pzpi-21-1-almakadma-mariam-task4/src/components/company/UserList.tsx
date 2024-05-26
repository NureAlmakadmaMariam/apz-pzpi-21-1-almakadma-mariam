import React from 'react';
import { User } from '../../interfaces/User';
import styles from '../../styles/UserList.module.css';
import { FormattedMessage } from 'react-intl';
import DeleteUserButton from './DeleteUserButton';
import EditableField from './EditableField';
import RoleSelect from './RoleSelect';
import DepartmentDropdown from './DepartmentDropdown';
import { Department } from '../../interfaces/Department';
import stylesD from '../../styles/DepartmentDropdown.module.css'
interface UserListProps {
    users: User[];
    departments: Department[]; // Додаємо властивість departments
    onDelete: () => void;
    onUpdateUser: (userId: number, userData: Partial<User>) => void;
    onUpdateDepartment: (userId: number, departmentId: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, departments, onUpdateUser, onDelete, onUpdateDepartment }) => {
    return (
        <div className={styles.userList}>
            {users.map((user) => (
                <div key={user.user_id} className={styles.userCard}>
                    <p>
                        <strong><FormattedMessage id="user.name" /> </strong>
                        <EditableField
                            value={user.first_name}
                            onSave={(newValue) => onUpdateUser(user.user_id, { first_name: newValue })}
                        />
                        &nbsp;
                        <EditableField
                            value={user.last_name}
                            onSave={(newValue) => onUpdateUser(user.user_id, { last_name: newValue })}
                        />
                    </p>
                    <p><strong><FormattedMessage id="user.email" />: </strong> {user.email}</p>
                    <p>
                        <strong><FormattedMessage id="user.role" />: </strong>
                        <RoleSelect value={user.role} onSave={(newValue) => {
                            if (newValue === 'employee' || newValue === 'manager') {
                                onUpdateUser(user.user_id, { role: newValue });
                            }
                        }} />
                    </p>
                    <p><strong><FormattedMessage id="user.points" /></strong> {user.points || <FormattedMessage id="department.noInfo" />}</p>
                    <p><strong><FormattedMessage id="department.name" /></strong>
                        <DepartmentDropdown
                            departments={departments}
                            selectedDepartmentId={user.department?.department_id || null}
                            onDepartmentChange={(event) => onUpdateDepartment(user.user_id, parseInt(event.target.value))}
                            className={stylesD.departmentDropdownUpdate}
                        />
                    </p>
                    <p><strong><FormattedMessage id="department.code" /></strong> {user.department?.department_code || <FormattedMessage id="department.noInfo" />}</p>
                    <p><strong><FormattedMessage id="user.startDate" /></strong> {new Date(user.start_date).toLocaleDateString()}</p>
                    <DeleteUserButton user={user} onDelete={onDelete} />
                </div>
            ))}
        </div>
    );
};

export default UserList;


/*
// src/components/UserList.tsx
import React from 'react';
import { User } from '../interfaces/User';
import styles from '../styles/UserList.module.css';
import { FormattedMessage } from 'react-intl';
import DeleteUserButton from './DeleteUserButton';
import EditableField from './EditableField';
import RoleSelect from './RoleSelect';
import DepartmentDropdown from './DepartmentDropdown'; // Імпортуємо компонент DepartmentDropdown
import { Department } from '../interfaces/Department'; // Додайте цей імпорт

interface UserListProps {
    users: User[];
    departments: Department[]; // Додаємо властивість departments
    onDelete: () => void;
    onUpdateUser: (userId: number, userData: Partial<User>) => void;
    onUpdateDepartment: (userId: number, departmentId: number) => void; // Додаємо функцію оновлення відділу користувача
}

const UserList: React.FC<UserListProps> = ({ users, departments, onUpdateUser, onDelete, onUpdateDepartment }) => {
    return (
        <div className={styles.userList}>
            {users.map((user) => (
                <div key={user.user_id} className={styles.userCard}>
                    <p>
                        <strong><FormattedMessage id="user.name" /> </strong>
                        <EditableField
                            value={user.first_name}
                            onSave={(newValue) => onUpdateUser(user.user_id, { first_name: newValue })}
                        />
                        &nbsp;
                        <EditableField
                            value={user.last_name}
                            onSave={(newValue) => onUpdateUser(user.user_id, { last_name: newValue })}
                        />
                    </p>
                    <p><strong><FormattedMessage id="user.email" /></strong> {user.email}</p>
                    <p>
                        <strong><FormattedMessage id="user.role" /></strong>
                        <RoleSelect value={user.role} onSave={(newValue) => {
                            if (newValue === 'employee' || newValue === 'manager') {
                                onUpdateUser(user.user_id, { role: newValue });
                            }
                        }} />
                    </p>
                    <p><strong><FormattedMessage id="department.name" /></strong> {user.department?.name || 'No department'}</p>
                    <p><strong><FormattedMessage id="department.code" /></strong> {user.department?.department_code || 'No department code'}</p>
                    <p><strong><FormattedMessage id="user.startDate" /></strong> {new Date(user.start_date).toLocaleDateString()}</p>
                    <p>
                        <strong><FormattedMessage id="user.status" /></strong> {user.status?.name}
                    </p>
                    <p><strong><FormattedMessage id="status.desc" />:</strong> {user.status?.description || 'No description'}</p>
                    {/* Додаємо компонент DepartmentDropdown для вибору відділу }
                    <DepartmentDropdown
                        departments={departments}
                        selectedDepartmentId={user.department?.department_id || null}
                        onDepartmentChange={(event) => onUpdateDepartment(user.user_id, parseInt(event.target.value))}
                    />
                    <DeleteUserButton user={user} onDelete={onDelete} />
                </div>
            ))}
        </div>
    );
};

export default UserList;
*/

