import CommentList from './CommentList';
import CommentInputBox from './CommentInputBox';
import { getComments } from '../api';
import React, { useState, useEffect } from 'react';

export default function CommentManager({ article_id }) {

    const { comments, fetchComments:refreshComments, isLoading, error } = fetchComments(article_id);

    const loadComments = () => {
        if (isLoading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.msg}</div>;
        if (comments.length === 0 || comments === undefined) return <div>No Comments</div>; 

        return <CommentList comments={comments} />
    }

    return (
        <>
            <CommentInputBox refreshComments={refreshComments} article_id={article_id}/>
            {loadComments()}
        </>
    )
}

function fetchComments (article_id) {
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

    return { comments, fetchComments, isLoading, error };
};