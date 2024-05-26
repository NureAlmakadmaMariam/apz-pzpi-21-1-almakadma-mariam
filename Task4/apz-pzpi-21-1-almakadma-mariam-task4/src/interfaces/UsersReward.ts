// src/interfaces/UsersReward.ts
import { User } from './User';
import { Reward } from './Reward';

export interface UsersReward {
    users_reward_id: number;
    redeemed: boolean;
    user_id: number;
    reward_id: number;
    user: User;
    reward: {
        reward_id: number;
        title: string;
        description: string | null;
        points_required: number;
        type: 'physical' | 'virtual' | null;
        company_id: number;
    };
}


export interface UsersAndRewardsResponse {
    usersAndRewards: UsersReward[];
}




/*import { User } from './User';
import { Reward } from './Reward';

export interface UsersReward {
    users_reward_id: number;
    redeemed: boolean;
    user_id: number;
    reward_id: number;
    user: User;
    reward: Reward;
}

export interface UsersAndRewardsResponse {
    usersAndRewards: UsersReward[];
}*/