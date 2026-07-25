import React from 'react'
import { motion } from 'framer-motion'

export default function MultimodalTimeline({ events = [] }) {
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
        ⏱ Multimodal Event Timeline
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 160, overflowY: 'auto' }}>
        {events.map((ev, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              background: 'rgba(4,13,26,0.6)',
              borderRadius: 8,
              fontSize: 11.5,
              color: 'rgba(240,246,255,0.85)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>{ev.icon || '⚡'}</span>
              <span>{ev.label}</span>
            </div>
            <span style={{ fontSize: 10, color: '#60A5FA', fontFamily: 'monospace', fontWeight: 600 }}>{ev.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
