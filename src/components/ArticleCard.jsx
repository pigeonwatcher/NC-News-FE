export default function ArticleCard({ article }) {
    return <li className='article-card'>
        <img className='article-card-img' src={article.article_img_url} />
        <h2 className='article-card-title'>{article.title}</h2>
        <p className='article-card-author'>Author: {article.author}</p>
        <p className='article-card-topic'>Topic: {article.topic}</p>
        </li>
}