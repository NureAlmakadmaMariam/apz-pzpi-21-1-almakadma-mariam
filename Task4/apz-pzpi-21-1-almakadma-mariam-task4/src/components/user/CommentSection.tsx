import React, { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { Comment } from '../../interfaces/Comment';

interface Props {
    taskId: number;
}

const CommentSection: React.FC<Props> = ({ taskId }) => {
    const { comments, addComment, useFetchCommentsByTaskId, error } = useComments();
    const [newCommentText, setNewCommentText] = useState('');
    const [loading, setLoading] = useState(false);

    useFetchCommentsByTaskId(taskId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newCommentText.trim() !== '') {
            setLoading(true);
            try {
                await addComment(newCommentText, taskId, 1);
                setNewCommentText('');
            } catch (err) {
                console.error('Failed to add comment:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!comments[taskId]) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments[taskId]?.map((comment: Comment) => (
                    <li key={comment.comment_id}>
                        <p>{comment?.text ?? 'No text available'}</p>
                        <p>{comment?.user?.email ?? 'No email available'}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add a comment"
                />
                <button type="submit" disabled={loading}>Submit</button>
            </form>
        </div>
    );
};

export default CommentSection;







