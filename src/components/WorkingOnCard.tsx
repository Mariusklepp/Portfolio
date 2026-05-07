import { Icon } from '@iconify/react'
import { type WorkingOnItem } from '../data/home'
import Tag from './Tag'

function WorkingOnCard({ item }: { item: WorkingOnItem }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            background: item.statusBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon icon={item.icon} width={22} height={22} color={item.iconColor} />
        </div>
        <span
          className="font-mono-label"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 500,
            color: item.statusColor,
            background: item.statusBg,
            padding: '4px 10px',
            borderRadius: '999px',
          }}
        >
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', animation: 'pulse 2s infinite' }} />
          {item.status}
        </span>
      </div>
      <div>
        <h3 style={{ fontWeight: 700, fontSize: '17px', color: 'var(--text)', marginBottom: '8px', letterSpacing: '-0.01em' }}>
          {item.title}
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.7 }}>{item.description}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
        {item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
      </div>
    </div>
  )
}

export default WorkingOnCard
