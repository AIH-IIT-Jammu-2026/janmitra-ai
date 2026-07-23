import React from 'react'

export default function ActionPlan({ items = [] }) {
  if (!items || items.length === 0) return null

  return (
    <div
      style={{
        marginTop: 14,
        padding: '14px 16px',
        background: 'rgba(11,36,71,0.5)',
        border: '1px solid rgba(56,189,248,0.2)',
        borderRadius: 12,
      }}
    >
      <div
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: '#38BDF8',
          marginBottom: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span>📋</span> Action Plan
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((item, idx) => {
          const title = typeof item === 'string' ? item : item.title
          const desc = typeof item === 'object' ? item.description : null
          const priority = typeof item === 'object' ? item.priority : null

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: 13,
                color: 'rgba(240,246,255,0.9)',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: '#34D399', fontWeight: 'bold', marginTop: 1 }}>✔</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#F0F6FF' }}>
                  {title}
                  {priority && (
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: 11,
                        padding: '1px 6px',
                        borderRadius: 10,
                        background: priority === 'High' ? 'rgba(239,68,68,0.2)' : 'rgba(37,99,235,0.2)',
                        color: priority === 'High' ? '#F87171' : '#60A5FA',
                      }}
                    >
                      {priority}
                    </span>
                  )}
                </div>
                {desc && <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.6)', marginTop: 2 }}>{desc}</div>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
