export default function Comment({ comment }) {
    
    return <li className='comment'>
    <p className='comment-username'>{comment.author}</p>
    <p className='comment-body'>{comment.body}</p>
    <p className='comment-votes'>Votes: {comment.votes}</p>
    </li>
}