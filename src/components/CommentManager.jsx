import ErrorHandler from '../components/ErrorHandler';
import CommentList from './CommentList';
import CommentInputBox from './CommentInputBox';
import { getComments, deleteComment } from '../api';
import { useState, useEffect } from 'react';

export default function CommentManager({ article_id }) {

    const { comments, setComments, isLoading, error } = useLoadComments(article_id);

    const useRemoveComment = () => {
        const [isLoading, setLoading] = useState(false); 
        const [error, setError] = useState(null); 

        const removeComment = async (user, commentToDelete) => {
            if(user === commentToDelete.author) {
                setLoading(true);
                try {
                    await deleteComment(commentToDelete.comment_id);
                    setComments((comments) => {
                        return comments.filter((comment) => comment.comment_id !== commentToDelete.comment_id);
                    })
                    setError(null);
                } catch(err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
        }

        return { removeComment, isLoading, error }
    }

    const displayComments = () => {
        if (isLoading) return <div className='comment-list'>Loading...</div>;
        if (error) return <div className='comment-list'><ErrorHandler error={error} /></div>;
        if (comments.length === 0 || !comments) return <div className='comment-list'>No Comments</div>; 

        return <CommentList comments={comments} useRemoveComment={useRemoveComment} />
    }

    return (
        <>
            <CommentInputBox setComments={setComments} article_id={article_id}/>
            {displayComments()}
        </>
    )
}

function useLoadComments (article_id) {
    const [comments, setComments] = useState();
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(); 

    const loadComments = async () => {
        setLoading(true);
        try {
            const loadedComments = await getComments(article_id);
            setComments(loadedComments);
            setError(null);
        } catch (err) {
            setError(err);
        } finally { 
            setLoading(false);
        }
    };

    useEffect(() => {
        loadComments();

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