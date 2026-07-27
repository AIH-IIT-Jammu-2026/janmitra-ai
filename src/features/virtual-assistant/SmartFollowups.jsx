import React from 'react'
import { motion } from 'framer-motion'

export default function SmartFollowups({ suggestions = [], onSelect }) {
  if (!suggestions || suggestions.length === 0) return null

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
        💡 Suggested Follow-up Actions
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {suggestions.map((item, idx) => (
          <motion.button
            key={idx}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(item)}
            style={{
              padding: '6px 12px',
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.35)',
              borderRadius: 14,
              color: '#60A5FA',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <span>👉 {item}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
