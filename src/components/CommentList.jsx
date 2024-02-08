import Comment from './Comment';
import { useState, useEffect } from 'react';

export default function CommentList({ comments, handleRemoveComment }) {

    return (
        <ul className='comment-list'>
            {comments.map((comment, index) => {
                return <Comment comment={comment} handleRemoveComment={handleRemoveComment} key={`${index}` + comment.comment_id} />
            })}
        </ul>
    )
}