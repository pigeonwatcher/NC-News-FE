import CommentList from './CommentList';
import CommentInputBox from './CommentInputBox';
import { getComments, deleteComment } from '../api';
import { useState, useEffect, useContext } from 'react';

export default function CommentManager({ article_id }) {

    const { comments, setComments, isLoading, error } = loadComments(article_id);
    const handleRemoveComment = createRemoveCommentHandler(setComments);

    const renderComments = () => {
        if (isLoading) return <div className='comment-list'>Loading...</div>;
        if (error) return <div className='comment-list'>Error: {error.message}</div>;
        if (comments.length === 0 || comments === undefined) return <div className='comment-list'>No Comments</div>; 

        return <CommentList comments={comments} handleRemoveComment={handleRemoveComment} />
    }

    return (
        <>
            <CommentInputBox setComments={setComments} article_id={article_id}/>
            {renderComments()}
        </>
    )
}

function loadComments (article_id) {
    const [comments, setComments] = useState();
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(); 

    const fetchComments = async () => {
        try {
            setLoading(true);
            const commentsList = await getComments(article_id);
            setComments(commentsList);
        } catch (err) {
            setError(err);
        } finally { 
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();

    }, [article_id]);

    return { comments, setComments, isLoading, error };
};

function createRemoveCommentHandler(setComments) {

    const handleRemoveComment = () => {
        const [isLoading, setLoading] = useState(false); 
        const [error, setError] = useState(); 

        const removeComment = async (user, commentToDelete) => {
            if(user === commentToDelete.author) {
                try {
                    setLoading(true);
                    await deleteComment(commentToDelete.comment_id);
                    setComments((comments) => {
                        return comments.filter((comment) => comment.comment_id !== commentToDelete.comment_id);
                    })
                } catch(err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
        }

        return { removeComment, isLoading, error }
    }

    return handleRemoveComment
}