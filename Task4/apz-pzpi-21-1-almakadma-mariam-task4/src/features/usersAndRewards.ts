// src/features/getUsersAndRewards.ts
import axios from 'axios';
import { UsersAndRewardsResponse } from '../interfaces/UsersReward';

export const getUsersAndRewards = async (companyId: number): Promise<UsersAndRewardsResponse> => {
    const url = `http://localhost:3500/users-reward/company/${companyId}/department`;

    const response = await axios.get<UsersAndRewardsResponse>(url);
    return response.data;
};
