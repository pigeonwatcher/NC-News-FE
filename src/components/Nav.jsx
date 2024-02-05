import Header from './Header';
import TopicSelector from './TopicSelector';
import SortBySelector from './SortBySelector';
import UserCard from './UserCard';

export default function Nav({ setTopic, setSortBy }) {
    
    return (
        <nav>
        <Header />
        <TopicSelector />
        <SortBySelector />
        <UserCard />
        </nav>
    )
}