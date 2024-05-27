import axios from 'axios';
import { Comment } from '../interfaces/Comment';
import { ApiResponse } from '../interfaces/ApiResponse';

export const createComment = async (text: string, task_id: number, user_id: number): Promise<Comment> => {
    try {
        const response = await axios.post<ApiResponse<Comment>>('http://localhost:3500/comment', { text, task_id, user_id });
        return response.data.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw new Error('Failed to create comment');
    }
};

export const getCommentsByTaskId = async (taskId: number): Promise<Comment[]> => {
    try {
        const response = await axios.get<{ message: string; comments: Comment[] }>(`http://localhost:3500/comment/task/${taskId}`);
        console.log('API Response:', response.data); // Додайте логування
        return response.data.comments;
    } catch (error) {
        console.error('Error fetching comments by task ID:', error);
        throw new Error('Failed to fetch comments by task ID');
    }
};

export const deleteCommentById = async (commentId: number): Promise<void> => {

    await axios.delete(`http://localhost:3500/comment/${commentId}`);
};
