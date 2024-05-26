// src/features/getUsersAndRewards.ts
import axios from 'axios';
import { UsersAndRewardsResponse, UsersReward } from '../interfaces/UsersReward';


export const getUsersAndRewards = async (companyId: number): Promise<UsersAndRewardsResponse> => {
    const url = `http://localhost:3500/users-reward/company/${companyId}/department`;

    const response = await axios.get<UsersAndRewardsResponse>(url);
    return response.data;
};

export const getRewardsByUserId = async (userId: number): Promise<UsersReward[]> => {
    const url = `http://localhost:3500/users-reward/user/${userId}`;
    const response = await axios.get<{ rewards: UsersReward[] }>(url);
    return response.data.rewards;
};