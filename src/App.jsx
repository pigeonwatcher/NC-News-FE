import { useState } from 'react'
import Nav from './components/Nav';
import Routers from './components/Routers';
import './App.css'

function App() {

  const [sortBy, setSortBy] = useState(null);

  return (
    <>
      <nav>
        <Nav />
      </nav>
      <main>
        <Routers />
      </main>
    </>
  )
}

export default App
