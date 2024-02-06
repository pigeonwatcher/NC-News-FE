import { postComment } from '../api';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/LoggedInUser';

export default function CommentInputBox({ refreshComments, article_id }) {

    const [ commentBody, setComment ] = useState('');
    const { submitComment, isLoading, error } = sendComment(refreshComments, article_id);
    const { user } = useContext(UserContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        submitComment(user, commentBody);
        setComment('');
    }

    if (isLoading) return <div className='comment-input-box'>Loading...</div>;
    if (error) return <div className='comment-input-box'>Error: {error.msg}</div>;

    return (
    <>
        <form className='comment-input-box' onSubmit={handleSubmit}>
            <label htmlFor='inputbox'>Comment </label>
            <input id='inputbox' value={commentBody} onChange={(event) => setComment(event.target.value)}></input>
            <button>Submit</button>
        </form>
    </>
    )
}

function sendComment(refreshComments, article_id) {

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendComment = async (commentToPost) => {
        try {
            setLoading(true);
            const comment = await postComment(article_id, commentToPost);
            console.log(comment);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
            refreshComments();
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