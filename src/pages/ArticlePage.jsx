import CommentList from '../components/CommentList';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function ArticlePage() {

    const navigate = useNavigate();
    const { article_id } = useParams();
    const { article, isLoading, error } = fetchArticle(article_id)
    const [ showComments, setShowComments ] = useState(false);

    const handleReturn = () => {
        navigate('/')
    }

    const handleShowComments = () => {
        setShowComments(!showComments);
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.msg}</div>;
    if (article === undefined) return <div>Article not found</div>; 

    return (
        <div className="article">
        <button className="article-return" onClick={handleReturn}>
            Return ←
        </button>
        <h2 className="article-title">{article.title}</h2>
        <p className="article-author">Author: {article.author}</p>
        <p className="article-topic">Topic: {article.topic}</p>
        <img className="article-img" src={article.article_img_url}></img>
        <p className="article-body">{article.body}</p>
        <p className="article-votes">Votes: {article.votes}</p>
        <button className="article-show-comments" onClick={handleShowComments}>
            {showComments ? "Hide": "Show"} Comments
        </button>
        {showComments ? 
            <CommentList article_id={article_id}/>
        : null}
        </div>
    )
}

const fetchArticle = (article_id) => {
    const [article, setArticle] = useState();
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(); 

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://nc-news-th0a.onrender.com/api/articles/${article_id}`);
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

    }, [article_id]);

    return { article, isLoading, error };
};

