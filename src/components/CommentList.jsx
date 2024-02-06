import Comment from './Comment';
import { useState, useEffect } from 'react';

export default function CommentList({ article_id }) {

    const { comments, isLoading, error } = fetchComments(article_id);

    if (isLoading) return <div className='comment-list'>Loading...</div>;
    if (error) return <div className='comment-list'>Error: {error.msg}</div>;
    if (comments.length === 0 || comments === undefined) return <div className='comment-list'>No Comments</div>; 
    
    return (
        <ul className='comment-list'>
        {comments.map((comment, index) => {
            return <Comment comment={comment} key={`${index}` + comment.comment_id} />
        })}
        </ul>
    )
}

const fetchComments = (article_id) => {
    const [comments, setComments] = useState();
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(); 

    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://nc-news-th0a.onrender.com/api/articles/${article_id}/comments`);
                if (!response.ok) { 
                    return Promise.reject();
                }
                const { comments } = await response.json();
                setComments(comments);
            } catch (err) {
                setError(err);
            } finally { 
                setLoading(false);
            }
        };

        fetchComments();

    }, [article_id]);

    return { comments, isLoading, error };
};