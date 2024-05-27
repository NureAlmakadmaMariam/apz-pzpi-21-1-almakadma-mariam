import React, { useState } from 'react';
import { createAchievement } from '../../features/achievements';
import { FormattedMessage } from 'react-intl';
import styles from '../../styles/AddAchievementForm.module.css';

interface AddAchievementFormProps {
    user_id: number;
}

const AddAchievementForm: React.FC<AddAchievementFormProps> = ({ user_id }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [pointsAwarded, setPointsAwarded] = useState<number | ''>(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const achievementData = {
                title,
                description,
                points_awarded: pointsAwarded === '' ? null : Number(pointsAwarded),
                user_id: user_id,
            };
            await createAchievement(achievementData);
            setTitle('');
            setDescription('');
            setPointsAwarded(0);
        } catch (error) {
            console.error('Error adding achievement:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>
                    <FormattedMessage id="achievement.title" />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                    />
                </label>
                <label className={styles.label}>
                    <FormattedMessage id="department.desc" />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                    />
                </label>
                <label className={styles.label}>
                    <FormattedMessage id="achievement.pointsAwarded" />
                    <input
                        type="number"
                        value={pointsAwarded === '' ? '' : pointsAwarded}
                        onChange={(e) => setPointsAwarded(parseInt(e.target.value, 10))}
                        className={styles.input}
                    />
                </label>
                <button type="submit" className={styles.button}>
                    <FormattedMessage id="achievement.add" />
                </button>
            </form>
        </div>
    );
};

export default AddAchievementForm;

