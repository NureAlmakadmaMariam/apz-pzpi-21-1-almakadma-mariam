import { useState, useEffect } from 'react';
import { Comment } from '../interfaces/Comment';
import { createComment, getCommentsByTaskId, deleteCommentById } from '../features/comments';

export const useComments = () => {
    const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
    const [error, setError] = useState<string | null>(null);

    const fetchCommentsByTaskId = async (taskId: number) => {
        try {
            console.log('Fetching comments for task ID:', taskId);
            const commentsData = await getCommentsByTaskId(taskId);
            console.log('Fetched comments:', commentsData);
            setComments(prevState => ({
                ...prevState,
                [taskId]: commentsData,
            }));
        } catch (err) {
            console.error('Error fetching comments by task ID:', err);
            setError('Failed to fetch comments by task ID');
        }
    };

    const addComment = async (text: string, taskId: number, userId: number) => {
        try {
            const newComment = await createComment(text, taskId, userId);
            setComments(prevState => ({
                ...prevState,
                [taskId]: [...(prevState[taskId] || []), newComment],
            }));
        } catch (err) {
            console.error('Error creating comment:', err);
            setError('Failed to create comment');
        }
    };

    const removeComment = async (commentId: number) => {
        try {
            await deleteCommentById(commentId);
            // Логіка для видалення коментаря з локального стану
        } catch (err) {
            console.error('Error deleting comment:', err);
            setError('Failed to delete comment');
        }
    };

    const useFetchCommentsByTaskId = (taskId: number) => {
        useEffect(() => {
            fetchCommentsByTaskId(taskId);
        }, [taskId]);
    };

    return { comments, fetchCommentsByTaskId, addComment, removeComment, useFetchCommentsByTaskId, error };
};

