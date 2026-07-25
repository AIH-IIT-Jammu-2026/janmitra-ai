import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LOADING_STEPS = [
  'Analyzing your request...',
  'Consulting AI experts...',
  'Generating personalized guidance...',
]

export default function LoadingOverlay({ show }) {
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    if (!show) {
      setStepIdx(0)
      return
    }
    const interval = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % LOADING_STEPS.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [show])

  if (!show) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4,13,26,0.85)',
          backdropFilter: 'blur(10px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: 40, maxWidth: 420 }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              margin: '0 auto 24px',
              boxShadow: '0 0 40px rgba(37,99,235,0.6)',
            }}
          >
            🤖
          </motion.div>

          <h3
            style={{
              color: '#F0F6FF',
              fontSize: 20,
              fontWeight: 700,
              fontFamily: 'Space Grotesk, sans-serif',
              marginBottom: 12,
            }}
          >
            JanMitra Multi-Agent Core
          </h3>

          <div
            style={{
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 24,
            }}
          >
            <motion.div
              key={stepIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                fontSize: 14,
                color: '#38BDF8',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#38BDF8',
                  boxShadow: '0 0 10px #38BDF8',
                  display: 'inline-block',
                }}
              />
              {LOADING_STEPS[stepIdx]}
            </motion.div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 6,
              justifyContent: 'center',
            }}
          >
            {[0, 1, 2].map((idx) => (
              <motion.div
                key={idx}
                animate={{
                  scale: stepIdx === idx ? [1, 1.4, 1] : 1,
                  opacity: stepIdx === idx ? 1 : 0.4,
                }}
                transition={{ duration: 0.6 }}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: stepIdx === idx ? '#38BDF8' : 'rgba(240,246,255,0.2)',
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
