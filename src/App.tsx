import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SmoothScroll from './components/SmoothScroll'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectPage from './pages/ProjectPage'
import ContactPage from './pages/ContactPage'

function App() {
  // Dark-first and now dark-only: the cinematic, editorial experience lives in
  // the dark, and the nav's mode toggle has been removed, so we simply lock the
  // dark theme on at the root.
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div style={{ minHeight: '100vh' }}>
      <SmoothScroll />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  )
}

export default App
