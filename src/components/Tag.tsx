function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="font-mono-label"
      style={{
        fontSize: '11px',
        color: 'var(--muted)',
        background: 'var(--bg-2)',
        border: '1px solid var(--border)',
        padding: '3px 10px',
        borderRadius: '6px',
      }}
    >
      {children}
    </span>
  )
}

export default Tag
