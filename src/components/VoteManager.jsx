import { patchVote } from '../api';


export default function VoteManager({ article }) {

    const { votes, handleVote, isLoading, error } = patchVote(article);

    if (error) return <div>Error: {error.msg}</div>;

    return (
        <div className="article-votes">
            <p>Votes: {votes}</p>
            <button className="upvote-button" onClick={() => handleVote(1)}>↑</button>
            <button className="downvote-button" onClick={() => handleVote(-1)}>↓</button>
            {isLoading 
            ? <div>Loading...</div>
            : null}
        </div>
    )
}

