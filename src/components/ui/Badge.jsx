import React from 'react'

export default function Badge({ children, type = 'blue', icon }) {
  const styles = {
    blue: { bg: 'rgba(37,99,235,0.15)', color: '#60A5FA', border: 'rgba(37,99,235,0.3)' },
    green: { bg: 'rgba(16,185,129,0.15)', color: '#34D399', border: 'rgba(16,185,129,0.3)' },
    purple: { bg: 'rgba(139,92,246,0.15)', color: '#A78BFA', border: 'rgba(139,92,246,0.3)' },
    orange: { bg: 'rgba(245,158,11,0.15)', color: '#FCD34D', border: 'rgba(245,158,11,0.3)' },
    red: { bg: 'rgba(239,68,68,0.15)', color: '#F87171', border: 'rgba(239,68,68,0.3)' },
  }

  const current = styles[type] || styles.blue

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 10px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 600,
        background: current.bg,
        color: current.color,
        border: `1px solid ${current.border}`,
        marginRight: 6,
        marginBottom: 6,
      }}
    >
      {icon && <span>{icon}</span>}
      {!icon && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: current.color,
            boxShadow: `0 0 6px ${current.color}`,
          }}
        />
      )}
      {children}
    </span>
  )
}
