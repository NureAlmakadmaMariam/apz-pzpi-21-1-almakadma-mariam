import React from 'react';
import { useUsersAndRewards } from '../../hooks/useUsersAndRewards';
import styles from '../../styles/UsersAndRewardsTable.module.css';
import {FormattedMessage} from "react-intl";

interface UsersAndRewardsTableProps {
    companyId: number;
}

const UsersAndRewardsTable: React.FC<UsersAndRewardsTableProps> = ({ companyId }) => {
    const { data, loading, error } = useUsersAndRewards(companyId);

    if (loading) {
        return <div><FormattedMessage id="loading.title" /></div>;
    }

    if (error) {
        return <div><FormattedMessage id="error.title" /> {error}</div>;
    }

    if (data.length === 0) return <p><FormattedMessage id="userReward.no" /></p>;

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th><FormattedMessage id="user.email" /></th>
                    <th><FormattedMessage id="user.role"/></th>
                    <th><FormattedMessage id="rewardСА.title"/></th>
                    <th>Points Required</th>
                    <th><FormattedMessage id="reward.redeemed"/></th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr key={item.users_reward_id}>
                        <td>{item.user.email}</td>
                        <td>{item.user.role}</td>
                        <td>{item.reward.title}</td>
                        <td>{item.reward.points_required}</td>
                        <td>{item.redeemed ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersAndRewardsTable;
