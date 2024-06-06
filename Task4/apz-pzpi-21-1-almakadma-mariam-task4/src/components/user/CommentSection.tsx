import React, { useState } from 'react';
import { useComments } from '../../hooks/useComments';
import { Comment } from '../../interfaces/Comment';
import {FormattedMessage, useIntl} from "react-intl";
import {useAuth} from "../../hooks/useAuth";

interface Props {
    taskId: number;
}

const CommentSection: React.FC<Props> = ({ taskId }) => {
    const { authState } = useAuth();
    const userId= authState.user_id;
    const { comments, addComment, removeComment, useFetchCommentsByTaskId, error } = useComments();
    const [newCommentText, setNewCommentText] = useState('');
    const [loading, setLoading] = useState(false);
    const intl = useIntl();

    useFetchCommentsByTaskId(taskId);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newCommentText.trim() !== '') {
            setLoading(true);
            try {
                if (userId === null || userId === undefined) {
                    throw new Error('User ID is not available');
                }
                await addComment(newCommentText, taskId, userId);
                setNewCommentText('');
            } catch (err) {
                console.error('Failed to add comment:', err);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleRemoveComment = async (commentId: number) => {
        setLoading(true);
        try {
            await removeComment(commentId, taskId);
        } catch (err) {
            console.error('Failed to remove comment:', err);
        } finally {
            setLoading(false);
        }
    };

    if (error) return <p><FormattedMessage id="error.title" /> {error}</p>;

    if (!comments[taskId]) {
        return<p><FormattedMessage id="loading.title" /></p>;
    }

    return (
        <div>
            <ul>
                {comments[taskId]?.map((comment: Comment) => (

                    <li key={comment.comment_id}>
                        <p>{comment?.text ?? <FormattedMessage id="no.textA" />}</p>
                        <p>{comment.user.email ?? <FormattedMessage id="no.emailA" />}</p>
                        <button onClick={() => handleRemoveComment(comment.comment_id)}><FormattedMessage id="delete" /></button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder={intl.formatMessage({ id: "add.comment" })}
                />
                <button type="submit" disabled={loading}><FormattedMessage id="submit" /></button>
            </form>
        </div>
    );
};

export default CommentSection;







