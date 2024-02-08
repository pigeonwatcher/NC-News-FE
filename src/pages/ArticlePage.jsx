import VoteManager from '../components/VoteManager';
import CommentManager from '../components/CommentManager';
import { getArticle } from '../api'
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function ArticlePage() {

    const navigate = useNavigate();
    const { article_id } = useParams();
    const { article, isLoading, error } = useLoadArticle(article_id)
    const [ showComments, setShowComments ] = useState(false);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {`${error.code} ${error.message}`}</div>;
    if (!article) return <div>Article not found</div>; 

    return (
        <div className="article">
        <button className="article-return" onClick={() => navigate('/')}>
            Return ←
        </button>
        <h2 className="article-title">{article.title}</h2>
        <p className="article-author">Author: {article.author}</p>
        <p className="article-topic">Topic: {article.topic}</p>
        <img className="article-img" src={article.article_img_url}></img>
        <p className="article-body">{article.body}</p>
        <VoteManager article={article}/>
        <button className="article-show-comments" onClick={() => setShowComments(!showComments)}>
            {showComments ? "Hide": "Show"} Comments
        </button>
        {showComments ? 
            <>
                <CommentManager article_id={article_id}/>
            </>
        : null}
        </div>
    )
}

function useLoadArticle (article_id) {
    const [article, setArticle] = useState(null);
    const [isLoading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const loadArticle = async () => {
            setLoading(true);
            try {
                const loadedArticle = await getArticle(article_id)
                setArticle(loadedArticle);
                setError(null);
            } catch (err) {
                setError(err);
            } finally { 
                setLoading(false);
            }
        };

        loadArticle();

    }, [article_id]);

    return { article, isLoading, error };
};