import { patchVote } from '../api';
import { useState, useEffect } from 'react'

export default function VoteManager({ article }) {

    const { votes, handleVote, isLoading, error } = useUpdateVote(article);

    if (error) return <div>Error: {`${error.code} ${error.message}`}</div>;

    return (
        <div className="article-votes">
            <p>Votes: {votes}</p>
            <button className="upvote-button" onClick={() => handleVote(1)}>
                ↑
            </button>
            <button className="downvote-button" onClick={() => handleVote(-1)}>
                ↓
            </button>
            {isLoading ? <div>Loading...</div> : null}
        </div>
    )
}

function useUpdateVote(article) {
    const [votes, setVotes] = useState(article.votes);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateVote = async (inc) => {
        setLoading(true);
        try {
            const votes = await patchVote(article.article_id, inc)
            setVotes(votes);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (inc) => {
        // Optimistic update
        setVotes((currentVotes) => currentVotes + inc);

        try {
            await updateVote(inc)
        } catch {
            setVotes((currentVotes) => currentVotes - inc);
        }
    };

    return { votes, handleVote, isLoading, error };
}

