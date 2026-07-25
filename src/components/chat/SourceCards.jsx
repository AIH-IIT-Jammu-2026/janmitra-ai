import React from 'react'

export default function SourceCards({ sources = [] }) {
  if (!sources || sources.length === 0) return null

  return (
    <div
      style={{
        marginTop: 12,
        padding: '12px 14px',
        background: 'rgba(7,26,53,0.6)',
        border: '1px solid rgba(56,189,248,0.15)',
        borderRadius: 12,
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: '#60A5FA',
          marginBottom: 8,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span>🔗</span> Official Sources
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {sources.map((src, idx) => {
          const name = typeof src === 'string' ? src : src.name
          const url = typeof src === 'object' ? src.url : '#'

          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 10px',
                borderRadius: 14,
                fontSize: 12,
                fontWeight: 500,
                background: 'rgba(37,99,235,0.12)',
                color: '#38BDF8',
                border: '1px solid rgba(56,189,248,0.25)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>🏛️</span>
              {name}
              <span style={{ fontSize: 10, opacity: 0.7 }}>↗</span>
            </a>
          )
        })}
      </div>
    </div>
  )
}
