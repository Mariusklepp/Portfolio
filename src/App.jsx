import { useState, useEffect } from 'react'
import Hero from './sections/Hero'
import Navbar from './components/Navbar'

function App() {
const [darkMode, setDarkMode] = useState(() => {
  const saved = localStorage.getItem('darkMode')
  if (saved !== null) return saved === 'true'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
})

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('darkMode', darkMode)
}, [darkMode])


  return (
    <main>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
    </main>
  )
}

export default App