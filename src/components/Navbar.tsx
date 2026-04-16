interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

function Navbar({ darkMode, setDarkMode }: NavbarProps) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="flex items-center gap-1 bg-gray-900 border border-gray-700 rounded-full px-4 py-2">
        <a href="#" className="text-white font-bold px-3 py-1 rounded-full bg-gray-700 mr-2">
          Marius
        </a>
        <a href="#about" className="text-gray-400 hover:text-white px-3 py-1 rounded-full transition">About</a>
        <a href="#projects" className="text-gray-400 hover:text-white px-3 py-1 rounded-full transition">Projects</a>
        <a href="#contact" className="text-gray-400 hover:text-white px-3 py-1 rounded-full transition">Contact</a>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-2 px-3 py-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar