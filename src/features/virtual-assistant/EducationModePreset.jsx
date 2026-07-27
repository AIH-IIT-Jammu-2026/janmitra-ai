import React from 'react'
import { motion } from 'framer-motion'

export default function EducationModePreset({ onSelect }) {
  const PRESETS = [
    { icon: '💻', label: 'Explain LeetCode Algorithm', query: 'Explain the algorithm and approach for this LeetCode problem' },
    { icon: '🐛', label: 'Debug Python / JS Code', query: 'Inspect and debug my code snippet on screen' },
    { icon: '📐', label: 'Solve Math Question', query: 'Step-by-step math question solution' },
    { icon: '🧬', label: 'Explain Biology Diagram', query: 'Explain all parts of this biology diagram' },
  ]

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#A78BFA', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
        🎓 Education Mode ("Explain Anything")
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
        {PRESETS.map((p, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(p.query)}
            style={{
              padding: '8px 10px',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 10,
              color: '#C4B5FD',
              fontSize: 11.5,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textAlign: 'left',
            }}
          >
            <span>{p.icon}</span>
            <span>{p.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
