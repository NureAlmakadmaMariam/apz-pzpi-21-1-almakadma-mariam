// src/interfaces/UsersReward.ts
import { User } from './User';
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
}