import { Link } from 'react-router-dom'

interface ButtonProps {
  to?: string
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

function Button({ to, href, children, variant = 'primary' }: Readonly<ButtonProps>) {
  const baseStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: variant === 'primary' ? 600 : 500,
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'opacity 0.2s, border-color 0.2s',
    ...(variant === 'primary'
      ? { background: 'var(--accent)', color: '#fff', border: 'none' }
      : {
          background: 'var(--surface)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
        }),
  }

  const handlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      if (variant === 'primary') {
        e.currentTarget.style.opacity = '0.85'
      } else {
        e.currentTarget.style.borderColor = 'var(--accent)'
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => {
      if (variant === 'primary') {
        e.currentTarget.style.opacity = '1'
      } else {
        e.currentTarget.style.borderColor = 'var(--border)'
      }
    },
  }

  if (to) {
    return (
      <Link to={to} style={baseStyle} className="cursor-pointer" {...handlers}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} style={baseStyle} className="cursor-pointer" {...handlers}>
      {children}
    </a>
  )
}

export default Button
