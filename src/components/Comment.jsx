import { useContext } from 'react';
import { UserContext } from '../contexts/LoggedInUser';

export default function Comment({ comment, handleRemoveComment }) {

    const { user } = useContext(UserContext);

    const { removeComment, isLoading, error } = handleRemoveComment()

    if (isLoading) return <div>Deleting...</div>;
    if (error) return <div>Error: {`${error.code} ${error.message}`}</div>;
    
    return <li className='comment'>
    <p className='comment-username'>{comment.author}</p>
    <p className='comment-body'>{comment.body}</p>
    <p className='comment-votes'>Votes: {comment.votes}</p>
    {user === comment.author
    ? <button className='comment-delete' onClick={() => removeComment(user, comment)}>Delete</button>
    : null}
    </li>
}