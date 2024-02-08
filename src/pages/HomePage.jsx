import ArticleList from '../components/ArticleList';
import TopicSelector from '../components/TopicSelector';
import SortBySelector from '../components/SortBySelector';
import ErrorHandler from '../components/ErrorHandler';
import { getArticles } from '../api';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {

    const { articles, isLoading, error } = useLoadArticles();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <ErrorHandler error={error} />
    if (articles.length === 0 || !articles) return <div>No articles found</div>;

    return (
        <>
            <TopicSelector />
            <SortBySelector />
            <ArticleList articles={articles} />
        </>
    )
}

// Custom Hook.
function useLoadArticles() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [ searchParams ] = useSearchParams();
    const topic = searchParams.get('topic');
    const sort_by = searchParams.get('sort_by');
    const order = searchParams.get('order');

    useEffect(() => {
        const loadArticles = async () => {
            setLoading(true);
            try {
                const loadedArticles = await getArticles(topic, sort_by, order);
                setArticles(loadedArticles);
                setError(null);
            } catch(err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        }

        loadArticles();
    }, [topic, sort_by, order])

    return { articles, isLoading, error }
}