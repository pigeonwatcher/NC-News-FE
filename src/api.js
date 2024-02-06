import { useState, useEffect } from 'react';
import axios from 'axios';

export function getArticles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const getArticles = async () => {
            try {
                const { data: {articles} } = await axios.get('https://nc-news-th0a.onrender.com/api/articles');
                setArticles(articles);
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        }

        getArticles();
    }, [])

    return { articles, isLoading, error }
}

export function getArticle (article_id) {
    const [article, setArticle] = useState();
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(); 

    useEffect(() => {
        const getArticle = async () => {
            try {
                setLoading(true);
                const { data: {article} } = await axios.get(`https://nc-news-th0a.onrender.com/api/articles/${article_id}`);
                setArticle(article);
            } catch (err) {
                setError(err);
            } finally { 
                setLoading(false);
            }
        };

        getArticle();

    }, [article_id]);

    return { article, isLoading, error };
};

export function getComments (article_id) {
    const [comments, setComments] = useState();
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(); 

    useEffect(() => {
        const getComments = async () => {
            try {
                setLoading(true);
                const { data: { comments } } = await axios.get(`https://nc-news-th0a.onrender.com/api/articles/${article_id}/comments`);
                setComments(comments);
            } catch (err) {
                setError(err);
            } finally { 
                setLoading(false);
            }
        };

        getComments();

    }, [article_id]);

    return { comments, isLoading, error };
};

export function patchVote(article) {
    const [votes, setVotes] = useState(article.votes);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const patchVote = async (inc) => {
        try {
            setLoading(true);
            const { data: { article: { votes } } } = await axios.patch(`https://nc-news-th0a.onrender.com/api/articles/${article.article_id}`, { inc_votes: inc });
            setVotes(votes);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = (inc) => {
        // Optimistic update
        setVotes((currentVotes) => currentVotes + inc);

        try {
            patchVote(inc)
        } catch {
            setVotes((currentVotes) => currentVotes - inc);
        }
    };

    return { votes, handleVote, isLoading, error };
}