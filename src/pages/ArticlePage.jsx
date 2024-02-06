import CommentList from '../components/CommentList';
import VoteManager from '../components/VoteManager';
import { getArticle } from '../api'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

export default function ArticlePage() {

    const navigate = useNavigate();
    const { article_id } = useParams();
    const { article, isLoading, error } = getArticle(article_id)
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
        <VoteManager article={article}/>
        <button className="article-show-comments" onClick={handleShowComments}>
            {showComments ? "Hide": "Show"} Comments
        </button>
        {showComments ? 
            <CommentList article_id={article_id}/>
        : null}
        </div>
    )
}


