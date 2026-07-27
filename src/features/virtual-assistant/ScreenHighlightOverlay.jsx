import React from 'react'
import { motion } from 'framer-motion'

export default function ScreenHighlightOverlay({ targetLabel = 'New Farmer Registration' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: 'absolute',
        top: '38%',
        right: '15%',
        padding: '10px 18px',
        background: 'rgba(37,99,235,0.9)',
        border: '2px solid #38BDF8',
        borderRadius: 14,
        color: 'white',
        fontWeight: 700,
        fontSize: 13,
        boxShadow: '0 0 30px rgba(56,189,248,0.8), 0 0 10px rgba(37,99,235,0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <motion.span
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ width: 10, height: 10, borderRadius: '50%', background: '#67E8F9' }}
      />
      <span>🔵 Click "{targetLabel}" Here!</span>
    </motion.div>
  )
}
