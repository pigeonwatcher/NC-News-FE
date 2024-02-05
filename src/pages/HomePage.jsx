import ArticleList from '../components/ArticleList';
import { useState, useEffect } from 'react';

export default function HomePage() {

    const { articles, isLoading, error } = fetchArticles();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.msg}</div>;
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
        const getArticles = async () => {
            try {
                const response = await fetch('https://nc-news-th0a.onrender.com/api/articles');
                if (!response.ok) {
                    return Promise.reject();
                }
                const { articles:allArticles } = await response.json();
                setArticles(allArticles);
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