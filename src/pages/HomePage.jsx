import ArticleList from '../components/ArticleList';
import { getArticles } from '../api';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function HomePage() {

    const location = useLocation();
    const { articles, isLoading, error } = loadArticles(location);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {`${error.code} ${error.message}`}</div>;
    if (articles.length === 0 || articles === undefined) return <div>No articles found</div>;

    return (
        <>
        <ArticleList articles={articles} />
        </>
    )
}

function loadArticles(location) {
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const topic = searchParams.get('topic');
                const articles = await getArticles(topic);
                setArticles(articles);
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        }

        loadArticles();
    }, [location])

    return { articles, isLoading, error }
}