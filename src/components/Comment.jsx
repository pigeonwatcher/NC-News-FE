import { useContext } from 'react';
import { UserContext } from '../contexts/LoggedInUser';

export default function Comment({ comment, removeComment }) {

    const { user } = useContext(UserContext);

    const { removeComment:deleteComment, isLoading, error } = removeComment()

    if (isLoading) return <div>Deleting...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return <li className='comment'>
    <p className='comment-username'>{comment.author}</p>
    <p className='comment-body'>{comment.body}</p>
    <p className='comment-votes'>Votes: {comment.votes}</p>
    {user === comment.author
    ? <button className='comment-delete' onClick={() => deleteComment(user, comment)}>Delete</button>
    : null}
    </li>
}