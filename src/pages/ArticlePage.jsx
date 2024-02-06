import CommentList from '../components/CommentList';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

export default function ArticlePage() {

    const { article_id } = useParams();
    const { article, isLoading, error } = fetchArticle(article_id)

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.msg}</div>;
    if (article === undefined) return <div>Article not found</div>; 

    return (
        <div className="article">
        <h2 className="article-title">{article.title}</h2>
        <p className="article-author">Author: {article.author}</p>
        <p className="article-topic">Topic: {article.topic}</p>
        <img className="article-img" src={article.article_img_url}></img>
        <p className="article-body">{article.body}</p>
        <p className="article-votes">Votes: {article.votes}</p>
        </div>
    )
}

const fetchArticle = (item_id) => {
    const [article, setArticle] = useState();
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(); 

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://nc-news-th0a.onrender.com/api/articles/${item_id}`);
                if (!response.ok) { 
                    return Promise.reject();
                }
                const { article } = await response.json();
                setArticle(article);
            } catch (err) {
                setError(err);
            } finally { 
                setLoading(false);
            }
        };

        fetchItem();

    }, [item_id]);

    return { article, isLoading, error };
};