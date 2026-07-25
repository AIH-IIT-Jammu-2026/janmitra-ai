import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import janviAvatarReal from '../../assets/janvi_avatar_real.png'

export default function JanviAvatar({ state = 'idle' }) {
  const [phonemeStep, setPhonemeStep] = useState(0)
  const [blink, setBlink] = useState(false)

  // Lip-Sync Phoneme Loop when speaking (A, E, O, M mouth shapes)
  useEffect(() => {
    let interval
    if (state === 'speaking') {
      interval = setInterval(() => {
        setPhonemeStep((prev) => (prev + 1) % 4)
      }, 120)
    } else {
      setPhonemeStep(0)
    }
    return () => clearInterval(interval)
  }, [state])

  // Natural Eye Blinking Loop
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 180)
    }, 3600)
    return () => clearInterval(blinkInterval)
  }, [])

  // State Configs
  const stateConfig = {
    idle: { color: '#38BDF8', glow: 'rgba(56,189,248,0.5)', text: '😊 Janvi Online · Ready' },
    listening: { color: '#2563EB', glow: 'rgba(37,99,235,0.75)', text: '🎤 Listening to Citizen...' },
    looking: { color: '#06B6D4', glow: 'rgba(6,182,212,0.85)', text: '👀 Janvi Seeing Screen & Camera...' },
    thinking: { color: '#8B5CF6', glow: 'rgba(139,92,246,0.85)', text: '🧠 Consulting AI Specialists...' },
    speaking: { color: '#10B981', glow: 'rgba(16,185,129,0.85)', text: '🗣️ Janvi Speaking...' },
  }

  const current = stateConfig[state] || stateConfig.idle

  // Phoneme Lip-Sync Paths for SVG mouth overlay
  const mouthPaths = [
    'M 43 54 Q 50 58 57 54 Z', // Closed / Neutral M
    'M 41 53 Q 50 66 59 53 Q 50 58 41 53 Z', // Wide Open A
    'M 42 53 Q 50 57 58 53 Q 50 63 42 53 Z', // Smile Open E
    'M 45 53 Q 50 63 55 53 Q 50 57 45 53 Z', // Rounded O
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%' }}>
      {/* Outer Ambient Neon Glow Halo */}
      <motion.div
        animate={{
          scale: state === 'speaking' ? [1, 1.12, 1] : state === 'listening' ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: state === 'speaking' ? 0.4 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 210,
          height: 250,
          borderRadius: 28,
          position: 'absolute',
          top: -10,
          background: `radial-gradient(circle, ${current.glow} 0%, transparent 75%)`,
          zIndex: 1,
          filter: 'blur(15px)',
        }}
      />

      {/* Main 3D Glass Card Container (Real Janvi Image wearing JanMitra AI T-Shirt) */}
      <motion.div
        animate={
          state === 'speaking'
            ? { y: [0, -5, 0, -3, 0], rotate: [0, 1, -1, 0] }
            : state === 'looking'
            ? { rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] }
            : state === 'thinking'
            ? { y: [0, -3, 0], rotate: [0, -1.5, 1.5, 0] }
            : { y: [0, -4, 0], rotate: [0, 1, -1, 0] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 220,
          height: 260,
          borderRadius: 24,
          background: 'linear-gradient(145deg, rgba(7,26,53,0.95), rgba(11,36,71,0.9))',
          border: `2px solid ${current.color}`,
          boxShadow: `0 0 35px ${current.glow}, inset 0 0 20px rgba(56,189,248,0.15)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
        }}
      >
        {/* Scanner Laser Sweep when in Vision Mode */}
        {state === 'looking' && (
          <motion.div
            animate={{ y: [-130, 130, -130] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '100%',
              height: 3,
              background: 'linear-gradient(90deg, transparent, #06B6D4, #67E8F9, transparent)',
              boxShadow: '0 0 15px #06B6D4',
              zIndex: 10,
            }}
          />
        )}

        {/* Real Janvi AI Girl Image Frame */}
        <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={janviAvatarReal}
            alt="Janvi AI Assistant"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 22,
              filter: state === 'thinking' ? 'brightness(1.1) contrast(1.05)' : 'none',
            }}
          />

          {/* SVG Expression Overlay (Eye Blinking & Lip Sync mouth movements over photorealistic face) */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 120"
            fill="none"
            style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          >
            {/* Eye Blinking Animation Overlay */}
            {blink && (
              <>
                <ellipse cx="38" cy="48" rx="7" ry="5" fill="#1A1829" />
                <ellipse cx="62" cy="48" rx="7" ry="5" fill="#1A1829" />
                <line x1="31" y1="48" x2="45" y2="48" stroke="#3D291F" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="55" y1="48" x2="69" y2="48" stroke="#3D291F" strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}

            {/* Lip Sync Phoneme Mouth Overlay when Speaking */}
            {state === 'speaking' && (
              <path d={mouthPaths[phonemeStep]} fill="#E11D48" stroke="#9F1239" strokeWidth="1" />
            )}
          </svg>
        </div>

        {/* Audio Equalizer Synced when Janvi is Speaking */}
        {state === 'speaking' && (
          <div style={{ position: 'absolute', bottom: 10, display: 'flex', gap: 3, alignItems: 'flex-end', height: 18, zIndex: 8 }}>
            {[12, 20, 10, 22, 14, 18, 8, 16].map((h, i) => (
              <motion.div
                key={i}
                style={{ width: 3, background: '#10B981', borderRadius: 2 }}
                animate={{ height: [4, h, 4] }}
                transition={{ duration: 0.3, repeat: Infinity, delay: i * 0.05 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Avatar Status Badge */}
      <div
        style={{
          marginTop: 12,
          padding: '6px 16px',
          borderRadius: 20,
          background: 'rgba(7,26,53,0.92)',
          border: `1px solid ${current.color}60`,
          fontSize: 12,
          fontWeight: 700,
          color: current.color,
          boxShadow: `0 0 16px ${current.glow}`,
          position: 'relative',
          zIndex: 3,
        }}
      >
        {current.text}
      </div>
    </div>
  )
}
