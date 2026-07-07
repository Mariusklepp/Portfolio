import { Link, useLocation } from 'react-router-dom'

/**
 * Minimal floating nav pill — name + links, nothing else. The dark/light toggle
 * was removed (the site is dark-only now), and the items are given more room to
 * breathe to read as a deliberate brand mark rather than a utility bar.
 */
function Navbar() {
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
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <div
        className="flex items-center gap-2 rounded-full px-3 py-1.5"
        style={{
          background: 'rgba(20, 20, 22, 0.72)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        {links.map(({ label, to }) => {
          const active = isActive(to)
          return (
            <Link
              key={label}
              to={to}
              className="px-4 py-1.5 rounded-full transition-all duration-200 text-xs cursor-pointer"
              style={
                active
                  ? { background: 'var(--accent-dim)', color: 'var(--accent)', letterSpacing: '0.04em' }
                  : { color: 'var(--muted)', letterSpacing: '0.04em' }
              }
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = 'var(--muted)'
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Navbar
