import { Link } from 'react-router-dom'

export default function ArticleCard({ article }) {

    return (
        <li className='article-card'>
            <img className='article-card-img' src={article.article_img_url} />
            <h2 className='article-card-title'>
                <Link to={`/article/${article.article_id}`}>
                    {article.title}
                </Link>
            </h2>
            <p className='article-card-author'>Author: {article.author}</p>
            <p className='article-card-topic'>Topic: {article.topic}</p>
        </li>
    )
}