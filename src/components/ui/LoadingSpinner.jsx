import React from 'react'

export default function LoadingSpinner({ label = 'Agents processing request...' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          boxShadow: '0 0 16px rgba(37,99,235,0.5)',
        }}
      >
        🤖
      </div>
      <div className="glass-card" style={{ padding: '12px 18px', borderRadius: 12 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#38BDF8',
              animation: 'pulse 1.2s infinite ease-in-out',
            }}
          />
          <span style={{ fontSize: 13, color: 'rgba(240,246,255,0.7)', fontWeight: 500 }}>
            {label}
          </span>
        </div>
      </div>
    </div>
  )
}
