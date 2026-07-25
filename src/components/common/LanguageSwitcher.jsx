import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import { SUPPORTED_LANGUAGES } from '../../config/languages'

export default function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const activeLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0]

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.native.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (code) => {
    setLanguage(code)
    setIsOpen(false)
    setSearch('')
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block', zIndex: 50 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          background: 'rgba(11,36,71,0.7)',
          border: '1px solid rgba(56,189,248,0.25)',
          borderRadius: 20,
          color: '#F0F6FF',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.2s',
        }}
      >
        <span>🌐 {activeLangObj.native}</span>
        <span style={{ fontSize: 10, color: 'rgba(240,246,255,0.5)' }}>▼</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              width: 240,
              maxHeight: 320,
              background: 'rgba(7,26,53,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(56,189,248,0.3)',
              borderRadius: 14,
              boxShadow: '0 0 25px rgba(4,13,26,0.8)',
              padding: 10,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Search Input */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 22 languages..."
              style={{
                width: '100%',
                padding: '7px 10px',
                borderRadius: 8,
                background: 'rgba(11,36,71,0.8)',
                border: '1px solid rgba(56,189,248,0.2)',
                color: '#fff',
                fontSize: 12,
                outline: 'none',
                marginBottom: 8,
              }}
            />

            {/* Language Options List */}
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {filteredLanguages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => handleSelect(l.code)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: currentLanguage === l.code ? 'rgba(37,99,235,0.3)' : 'transparent',
                    border: 'none',
                    color: currentLanguage === l.code ? '#60A5FA' : 'rgba(240,246,255,0.85)',
                    fontWeight: currentLanguage === l.code ? 700 : 500,
                    fontSize: 13,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <span>{l.native}</span>
                  <span style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)' }}>{l.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
