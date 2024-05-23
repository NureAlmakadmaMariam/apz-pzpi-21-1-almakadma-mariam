export interface Reward {
    reward_id: number;
    title: string;
    description: string;
    points_required: number;
    type: 'physical' | 'virtual';
    company_id: number;
}
