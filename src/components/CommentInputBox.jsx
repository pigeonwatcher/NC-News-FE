import { postComment } from '../api';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/LoggedInUser';

export default function CommentInputBox({ setComments, article_id }) {

    const { user } = useContext(UserContext);
    const [ commentBody, setComment ] = useState('');
    const [ isValid, setIsValid ] = useState()
    const { sendComment, isLoading, error } = useSendComment(setComments, article_id);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(commentBody.length <= 0 || !commentBody.trim()) {
            setIsValid(false);
        } else {
            sendComment(user, commentBody);
            setComment('');
            setIsValid(true);
        }
    }

    if (error) return <div className='comment-input-box'>Error: {`${error.code} ${error.message}`}</div>;

    return (
        <form className='comment-input-box' onSubmit={handleSubmit}>
            <label htmlFor='inputbox'>Comment </label>
            <input id='inputbox' value={commentBody} onChange={(event) => setComment(event.target.value)}></input>
            {isLoading ? <div className='comment-input-box'>Posting Comment...</div> : <button>Submit</button>}
            {!isValid ? <p>Invalid Format: Empty</p> : null}
        </form>
    )
}

function useSendComment(setComments, article_id) {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendComment = async (user, body) => {
        setLoading(true);
        try {
            const comment = await postComment(article_id, { username: user, body: body });
            setComments((comments) => {
                return [comment, ...comments];
            })
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { sendComment, isLoading, error }
}