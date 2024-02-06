import { useState } from 'react'
import Nav from './components/Nav';
import Routers from './components/Routers';
import './App.css'

function App() {

  const [topic, setTopic] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  return (
    <>
      <nav>
        <Nav setTopic={setTopic} setSortBy={setSortBy}/>
      </nav>
      <main>
        <Routers />
      </main>
    </>
  )
}

export default App
