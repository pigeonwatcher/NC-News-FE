import ArticleCard from "./ArticleCard";

export default function ArticleList({ articles }) {
    
    return (
        <ul className='article-list'>
        {articles.map((article, index) => {
            return <ArticleCard article={article} key={`${index}` + article.article_id} />
        })}
        </ul>
    )
}