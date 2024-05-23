import React, { useState } from 'react';
import { createReward } from '../features/rewards';
import { Reward } from '../interfaces/Reward';
import styles from '../styles/CreateRewardForm.module.css';
import {FormattedMessage} from "react-intl";

interface CreateRewardFormProps {
    companyId: string;
    onRewardCreated: (reward: Reward) => void;
}

const CreateRewardForm: React.FC<CreateRewardFormProps> = ({ companyId, onRewardCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pointsRequired, setPointsRequired] = useState(0);
    const [type, setType] = useState<'physical' | 'virtual'>('physical');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newReward = await createReward(title, description, pointsRequired, type, companyId);
            onRewardCreated(newReward); // Викликаємо функцію для оновлення списку нагород
            setTitle('');
            setDescription('');
            setPointsRequired(0);
            setType('physical');
        } catch (error) {
            console.error('Error creating reward:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}><FormattedMessage id="reward.create" /></h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.formLabel}><FormattedMessage id="rewardСА.title" />:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.formLabel}><FormattedMessage id="rewardСА.desc" /></label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required className={styles.formTextarea} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="pointsRequired" className={styles.formLabel}><FormattedMessage id="reward.pointsReq" /></label>
                    <input type="number" id="pointsRequired" value={pointsRequired} onChange={(e) => setPointsRequired(parseInt(e.target.value))} required className={styles.formInput} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="type" className={styles.formLabel}><FormattedMessage id= "reward.type" /></label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value as 'physical' | 'virtual')} className={styles.formSelect}>
                        <option value="physical"><FormattedMessage id="reward.physical" /></option>
                        <option value="virtual"><FormattedMessage id="reward.virtual" /></option>
                    </select>
                </div>
                <button type="submit" className={styles.submitButton}><FormattedMessage id="reward.create" /></button>
            </form>
        </div>
    );
};

export default CreateRewardForm;





/*
import React, { useState } from 'react';
import { createReward } from '../features/rewards'; // Імпортуємо функцію створення нагороди
import { Reward } from '../interfaces/Reward';

interface CreateRewardFormProps {
    companyId: string;
    onRewardCreated: (reward: Reward) => void; // Функція, яка буде викликана після успішного створення нагороди
}

const CreateRewardForm: React.FC<CreateRewardFormProps> = ({ companyId, onRewardCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pointsRequired, setPointsRequired] = useState(0);
    const [type, setType] = useState<'physical' | 'virtual'>('physical'); // Початковий тип нагороди - physical

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newReward = await createReward(title, description, pointsRequired, type, companyId);
            onRewardCreated(newReward); // Викликаємо функцію, що передана через props, для оновлення списку нагород
            // Очищаємо поля форми після створення нагороди
            setTitle('');
            setDescription('');
            setPointsRequired(0);
            setType('physical');
        } catch (error) {
            console.error('Error creating reward:', error);
            // Тут можна додати обробку помилки, наприклад, показати повідомлення користувачеві
        }
    };

    return (
        <div>
            <h2>Create New Reward</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="pointsRequired">Points Required:</label>
                    <input type="number" id="pointsRequired" value={pointsRequired} onChange={(e) => setPointsRequired(parseInt(e.target.value))} />
                </div>
                <div>
                    <label htmlFor="type">Type:</label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value as 'physical' | 'virtual')}>
                        <option value="physical">Physical</option>
                        <option value="virtual">Virtual</option>
                    </select>
                </div>
                <button type="submit">Create Reward</button>
            </form>
        </div>
    );
};

export default CreateRewardForm;
*/