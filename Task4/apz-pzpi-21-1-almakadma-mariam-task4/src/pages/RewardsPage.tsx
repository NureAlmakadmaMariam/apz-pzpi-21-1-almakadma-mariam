import React, { useState } from 'react';
import { useRewards } from '../hooks/useRewards';
import RewardList from '../components/RewardList';
import CreateRewardForm from '../components/CreateRewardForm';
import styles from '../styles/RewardsPage.module.css';
import Sidebar from "../components/Sidebar";
import { FormattedMessage } from "react-intl";
import { Reward } from '../interfaces/Reward';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UsersAndRewardsTable from '../components/UsersAndRewardsTable';

const RewardsPage: React.FC = () => {
    const companyIdString = localStorage.getItem('companyId') || '';
    const companyId = parseInt(companyIdString, 10);

    const { rewards, loading, error, setRewards, refetch } = useRewards(companyIdString);

    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCreateButtonClick = () => {
        setShowCreateForm(true);
    };

    const handleRewardCreated = (newReward: Reward) => {
        if (newReward.title && newReward.description) {
            setRewards((prevRewards) => [...prevRewards, newReward]);
        } else {
            console.error('New reward data is incomplete:', newReward);
        }
        setShowCreateForm(false);
        refetch();
    };

    if (loading) {
        return <div><FormattedMessage id="loading.title" /></div>;
    }

    if (error) {
        return <div><FormattedMessage id="error.title" /> {error}</div>;
    }

    return (
        <div>
            <Sidebar />
            <div className={styles.rewardsPage}>
                <h1><FormattedMessage id="rewards.page" /></h1>
                {!showCreateForm && (
                    <button onClick={handleCreateButtonClick} className={styles.addButton}>
                        <FontAwesomeIcon icon={faPlus} /> <FormattedMessage id="reward.create" />
                    </button>
                )}
                {showCreateForm && <CreateRewardForm companyId={companyIdString} onRewardCreated={handleRewardCreated} />}
                <RewardList rewards={rewards} />

                <UsersAndRewardsTable companyId={companyId} />
            </div>
        </div>
    );
};

export default RewardsPage;



/*
import React, { useState } from 'react';
import { useRewards } from '../hooks/useRewards';
import RewardList from '../components/RewardList';
import CreateRewardForm from '../components/CreateRewardForm';
import styles from '../styles/RewardsPage.module.css';
import Sidebar from "../components/Sidebar";
import { FormattedMessage } from "react-intl";
import { Reward } from '../interfaces/Reward';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import UsersAndRewardsTable from '../components/UsersAndRewardsTable';

const RewardsPage: React.FC = () => {
    const companyId = localStorage.getItem('companyId') || '';
    const companyIdN = parseInt(companyId, 10);

    const { rewards, loading, error, setRewards, refetch } = useRewards(companyId);

    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleCreateButtonClick = () => {
        setShowCreateForm(true);
    };

    const handleRewardCreated = (newReward: Reward) => {
        if (newReward.title && newReward.description) {
            setRewards((prevRewards) => [...prevRewards, newReward]);
        } else {
            console.error('New reward data is incomplete:', newReward);
        }
        setShowCreateForm(false);
        refetch()
    };

    if (loading) {
        return <div><FormattedMessage id="loading.title" /></div>;
    }

    if (error) {
        return <div><FormattedMessage id="error.title" /> {error}</div>;
    }

    return (
        <div>
            <Sidebar/>
            <div className={styles.rewardsPage}>
                <h1><FormattedMessage id="rewards.page" /></h1>
                {!showCreateForm && (
                    <button onClick={handleCreateButtonClick} className={styles.addButton}>
                        <FontAwesomeIcon icon={faPlus} /> <FormattedMessage id="reward.create" />
                    </button>
                )}
                {showCreateForm && <CreateRewardForm companyId={companyId} onRewardCreated={handleRewardCreated} />}
                <RewardList rewards={rewards} />

                <UsersAndRewardsTable companyId={companyIdN} />
            </div>
        </div>
    );
};

export default RewardsPage;

*/