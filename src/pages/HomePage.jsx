import ArticleList from '../components/ArticleList';
import { getArticles } from '../api';
import { useState, useEffect } from 'react';

export default function HomePage() {

    const { articles, isLoading, error } = fetchArticles();

    if (isLoading) return <div>Loading...</div>;
    if (error) {console.log(error); return <div>Error: {error.msg}</div>;}
    if (articles.length === 0 || articles === undefined) return <div>No articles found</div>;

    return (
        <>
        <ArticleList articles={articles} />
        </>
    )
}

function fetchArticles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articles = await getArticles();
                setArticles(articles);
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        }

        fetchArticles();
    }, [])

    return { articles, isLoading, error }
}