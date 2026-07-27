import React from 'react'
import { motion } from 'framer-motion'
import { SUPPORTED_LANGUAGES } from '../../config/languages'

export default function LanguageSelection({ onSelectLanguage }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 30,
        background: 'rgba(7,26,53,0.92)',
        borderRadius: 20,
        border: '1px solid rgba(56,189,248,0.3)',
        boxShadow: '0 0 40px rgba(4,13,26,0.9)',
        textAlign: 'center',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 12 }}>🇮🇳</div>
      <h2 style={{ fontSize: 24, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, marginBottom: 8 }}>
        Namaste! Select Your Preferred Language
      </h2>
      <p style={{ fontSize: 13, color: 'rgba(240,246,255,0.65)', marginBottom: 24 }}>
        Janvi AI provides live voice conversation, document guidance, and portal assistance in 22 official Indian languages.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, maxHeight: 320, overflowY: 'auto', paddingRight: 6 }}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <motion.button
            key={lang.code}
            whileHover={{ scale: 1.05, borderColor: '#38BDF8' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectLanguage(lang.code)}
            style={{
              padding: '12px 10px',
              background: 'rgba(11,36,71,0.7)',
              border: '1px solid rgba(56,189,248,0.2)',
              borderRadius: 12,
              color: '#F0F6FF',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              transition: 'all 0.2s',
            }}
          >
            <span style={{ fontSize: 15, fontWeight: 700, color: '#60A5FA' }}>{lang.native}</span>
            <span style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)' }}>{lang.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
