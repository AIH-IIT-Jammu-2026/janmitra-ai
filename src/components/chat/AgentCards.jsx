import React from 'react'

export default function AgentCards({ agents = [] }) {
  if (!agents || agents.length === 0) return null

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
        padding: '8px 12px',
        marginBottom: 10,
        background: 'rgba(37,99,235,0.08)',
        borderRadius: 10,
        border: '1px solid rgba(56,189,248,0.2)',
      }}
    >
      <span style={{ fontSize: 12, color: 'rgba(240,246,255,0.6)', fontWeight: 600 }}>
        Agents Used:
      </span>
      {agents.map((agent) => (
        <span
          key={agent}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '3px 10px',
            borderRadius: 16,
            fontSize: 12,
            fontWeight: 600,
            background: 'rgba(16,185,129,0.12)',
            color: '#34D399',
            border: '1px solid rgba(16,185,129,0.25)',
          }}
        >
          <span style={{ fontSize: 10 }}>🟢</span>
          {agent}
        </span>
      ))}
    </div>
  )
}
