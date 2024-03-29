import Comment from './Comment';

export default function CommentList({ comments, useRemoveComment }) {

    return (
        <ul className='comment-list'>
            {comments.map((comment, index) => {
                return <Comment comment={comment} useRemoveComment={useRemoveComment} key={`${index}` + comment.comment_id} />
            })}
        </ul>
    )
}