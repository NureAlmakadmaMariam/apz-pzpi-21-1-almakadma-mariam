import axios from 'axios';
import { Comment } from '../interfaces/Comment';
import { ApiResponse } from '../interfaces/ApiResponse';

export const createComment = async (text: string, task_id: number, user_id: number): Promise<Comment> => {
    try {
        const response = await axios.post<{ message: string, newComment: Comment }>('http://localhost:3500/comment', { text, task_id, user_id });
        console.log('Create comment response:', response.data); // Логування відповіді API
        return response.data.newComment;
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
    try {
        await axios.delete(`http://localhost:3500/comment/${commentId}`);
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw new Error('Failed to delete comment');
    }
};