import React from 'react'
import { motion } from 'framer-motion'

export default function ThinkingTimeline({ events = [], thinkingStep = '' }) {
  return (
    <div
      style={{
        background: 'rgba(11,36,71,0.65)',
        border: '1px solid rgba(56,189,248,0.2)',
        borderRadius: 16,
        padding: 14,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
        ⏱ Thinking & Activity Timeline
      </div>

      {thinkingStep && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '8px 12px',
            background: 'rgba(37,99,235,0.2)',
            border: '1px solid rgba(56,189,248,0.35)',
            borderRadius: 10,
            fontSize: 12,
            color: '#60A5FA',
            fontWeight: 600,
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#38BDF8' }} />
          <span>{thinkingStep}</span>
        </motion.div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 150, overflowY: 'auto' }}>
        {events.map((ev, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              background: 'rgba(4,13,26,0.6)',
              borderRadius: 8,
              fontSize: 11,
              color: 'rgba(240,246,255,0.85)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{ev.icon || '⚡'}</span>
              <span>{ev.label}</span>
            </div>
            <span style={{ fontSize: 9.5, color: '#60A5FA', fontFamily: 'monospace', fontWeight: 600 }}>{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
