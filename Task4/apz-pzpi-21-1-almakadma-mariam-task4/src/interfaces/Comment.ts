// interfaces/Comment.ts
export interface Comment {
    comment_id: number;
    text: string;
    created_at: string;
    task_id: number;
    user: {
        user_id: number;
        email: string;
    };

}

