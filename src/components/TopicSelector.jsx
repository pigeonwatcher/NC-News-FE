import { useEffect, useState } from "react";
import { getTopics } from "../api";
import { useNavigate } from "react-router-dom";

export default function TopicSelector() {

    const navigate = useNavigate();
    const [topic, setTopic] = useState();
    const { topics, isLoading, error } = loadTopics();

    const onChange = (event) => {
        event.preventDefault();
        const selectedTopic = event.target.value;
        setTopic(selectedTopic);
        if(selectedTopic !== undefined && selectedTopic !== null && selectedTopic !== "All") {
            navigate(`?topic=${selectedTopic}`);
        } else {
            navigate(``);
        }
    }

    return (
        <>
        <label htmlFor="topics">Category:</label>
        <select name="topics" id="topics" onChange={onChange}>
            {topics.map((topic)=> {
                return topic === null ? <option key={"All"}>{"All"}</option> :
                <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
            })}
        </select> 
        </>
    )
}

function loadTopics() {

    const [ topics, setTopics ] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {

        const loadTopics = async () => {
            try {
                const topics = await getTopics();
                topics.unshift(null);
                setTopics(topics);
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