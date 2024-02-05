import { useState } from 'react'
import Nav from './components/Nav';
import Routers from './components/Routers';
import './App.css'

function App() {

  const [topic, setTopic] = useState(null);
  const [sortBy, setSortBy] = useState(null);

  return (
    <>
      <Nav setTopic={setTopic} setSortBy={setSortBy}/>
      <Routers />
    </>
  )
}

export default App
