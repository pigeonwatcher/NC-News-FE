import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { useSearchParams } from "react-router-dom";

export default function TopicSelector() {

    const [ searchParams, setSearchParams ] = useSearchParams();
    const { topics, isLoading, error } = useLoadTopics();
    const currentTopic = searchParams.get('topic') || '';

    const onChange = (event) => {
        event.preventDefault();
        setSearchParams((params) => {
            params.set('topic', event.target.value);
            return params;
        })
    }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {`${error.code} ${error.message}`}</div>;

    return (
        <div id='topic-selector'>
            <label htmlFor='topics'>Category:</label>
            <select name='topics' id='topics' value={currentTopic} onChange={onChange}>
                <option key={'All'}>{'All'}</option>
                {topics.map((topic)=> {
                    return <option key={topic.slug} value={topic.slug}>{topic.display}</option>
                })}
            </select> 
        </div>
    )
}

function useLoadTopics() {

    const [ topics, setTopics ] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTopics = async () => {
            setLoading(true);
            try {
                const loadedTopics = await getTopics();
                setTopics(loadedTopics.map((topic) => {
                    topic['display'] = topic.slug.replace(/(^\w|\s\w)/g, m => m.toUpperCase()); // Capitalise first letter for display. Thank you stackexchange. 
                    return topic;
                }));
                setError(null);
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        loadTopics();
    }, [])

    return { topics, isLoading, error };
}