import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import TechStack from './sections/TechStack'
import Projects from './sections/Projects'
import ProjectPage from './pages/ProjectPage'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
localStorage.setItem('darkMode', String(darkMode))
  }, [darkMode])

  return (
    <div className="bg-white dark:bg-gray-950">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <About />
            <TechStack />
            <Projects />
          </main>
        } />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </div>
  )
}

export default App