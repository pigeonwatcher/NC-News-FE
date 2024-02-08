import { postComment } from '../api';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/LoggedInUser';

export default function CommentInputBox({ setComments, article_id }) {

    const [ commentBody, setComment ] = useState('');
    const [ isValid, setIsValid ] = useState()
    const { submitComment, isLoading, error } = sendComment(setComments, article_id);
    const { user } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        if(commentBody.length > 0) {
            submitComment(user, commentBody);
            setComment('');
            setIsValid(null);
        } else {
            setIsValid(true);
        }
    }

    if (error) return <div className='comment-input-box'>Error: {`${error.code} ${error.message}`}</div>;


    return (
    <>
        <form className='comment-input-box' onSubmit={handleSubmit}>
            <label htmlFor='inputbox'>Comment </label>
            <input id='inputbox' value={commentBody} onChange={(event) => setComment(event.target.value)}></input>
            {isLoading ? <div className='comment-input-box'>Posting Comment...</div> : <button>Submit</button>}
            {isValid ? <p>Invalid Format: Empty</p> : null}
        </form>
    </>
    )
}

function sendComment(setComments, article_id) {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendComment = async (commentToPost) => {
        try {
            setLoading(true);
            const comment = await postComment(article_id, commentToPost);
            setComments((comments) => {
                return [comment, ...comments];
            })
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const submitComment = (user, body) => {
        const commentToPost = {
            username: user,
            body: body
        }

        sendComment(commentToPost);
    }

    return { submitComment, isLoading, error }
}