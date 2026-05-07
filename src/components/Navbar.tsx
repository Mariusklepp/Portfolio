import { Link, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'

interface NavbarProps {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
}

function Navbar({ darkMode, setDarkMode }: Readonly<NavbarProps>) {
  const { pathname } = useLocation()

  const links = [
    { label: 'Marius',   to: '/' },
    { label: 'about',    to: '/about' },
    { label: 'projects', to: '/projects' },
    { label: 'contact',  to: '/contact' },
  ]

  const isActive = (to: string) => {
    if (to === '/') return pathname === '/'
    return pathname.startsWith(to)
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-0.5 rounded-full px-2 py-1.5 text-sm"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {links.map(({ label, to }) => {
          const active = isActive(to)
          return (
            <Link
              key={label}
              to={to}
              className="px-3 py-1 rounded-full transition-all duration-200 text-xs"
              style={
                active
                  ? { background: 'var(--accent-dim)', color: 'var(--accent)' }
                  : { color: 'var(--muted)' }
              }
            >
              {label}
            </Link>
          )
        })}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-1 px-2.5 py-1 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
          style={{ color: 'var(--muted)', background: 'var(--bg-2)' }}
          aria-label="Toggle dark mode"
        >
          <Icon icon={darkMode ? 'lucide:sun' : 'lucide:moon'} width={14} height={14} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
