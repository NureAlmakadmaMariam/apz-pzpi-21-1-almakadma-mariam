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
            await createComment(text, taskId, userId);
            // Після додавання коментаря, повторно отримуємо коментарі, щоб отримати повну інформацію
            await fetchCommentsByTaskId(taskId);
        } catch (err) {
            console.error('Error creating comment:', err);
            setError('Failed to create comment');
        }
    };

    const removeComment = async (commentId: number, taskId: number) => {
        try {
            // Видалення коментаря
            await deleteCommentById(commentId);
            // Оновлення стану коментарів після видалення
            await fetchCommentsByTaskId(taskId);
        } catch (err) {
            console.error('Error removing comment:', err);
            setError('Failed to remove comment');
        }
    };

    const useFetchCommentsByTaskId = (taskId: number) => {
        useEffect(() => {
            fetchCommentsByTaskId(taskId);
        }, [taskId]);
    };

    return { comments, fetchCommentsByTaskId, addComment, removeComment, useFetchCommentsByTaskId, error };
};

