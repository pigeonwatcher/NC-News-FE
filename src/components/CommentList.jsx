import Comment from './Comment';
import { getComments } from '../api';
import { useState, useEffect } from 'react';

export default function CommentList({ article_id }) {

    const { comments, isLoading, error } = getComments(article_id);

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