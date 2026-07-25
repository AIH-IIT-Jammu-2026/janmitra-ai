import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function JanviAvatar({ state = 'idle' }) {
  const [phonemeStep, setPhonemeStep] = useState(0)
  const [blink, setBlink] = useState(false)

  // Realistic Phoneme Lip-Sync Loop when speaking (cycles through A, E, O, M phoneme shapes)
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
    looking: { color: '#06B6D4', glow: 'rgba(6,182,212,0.85)', text: '👀 Janvi Seeing Your Screen & Camera...' },
    thinking: { color: '#8B5CF6', glow: 'rgba(139,92,246,0.85)', text: '🧠 Consulting AI Specialists...' },
    speaking: { color: '#10B981', glow: 'rgba(16,185,129,0.85)', text: '🗣️ Janvi Speaking...' },
  }

  const current = stateConfig[state] || stateConfig.idle

  // Phoneme Mouth SVG Path Mapping
  const mouthPaths = [
    'M 43 53 Q 50 59 57 53 Z', // Closed / Neutral M
    'M 41 52 Q 50 66 59 52 Q 50 58 41 52 Z', // Wide Open A
    'M 42 53 Q 50 57 58 53 Q 50 63 42 53 Z', // Smile Open E
    'M 45 52 Q 50 64 55 52 Q 50 58 45 52 Z', // Rounded O
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

      {/* Main 3D Card Container (Realistic AI Girl Avatar) */}
      <motion.div
        animate={
          state === 'speaking'
            ? { y: [0, -5, 0, -3, 0], rotate: [0, 1.2, -1.2, 0] }
            : state === 'looking'
            ? { rotate: [0, 2.5, -2.5, 0], scale: [1, 1.02, 1] }
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

        {/* Realistic Animated AI Girl Character Rendering */}
        <div style={{ position: 'relative', width: 180, height: 210, display: 'flex', justifyContent: 'center' }}>
          <svg width="180" height="210" viewBox="0 0 100 120" fill="none">
            <defs>
              <radialGradient id="skinGrad" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#FFF0E6" />
                <stop offset="70%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FDBA74" />
              </radialGradient>
              <linearGradient id="shirtGrad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#071A35" />
                <stop offset="50%" stopColor="#0B2447" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0" y1="0" x2="0" y2="100">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
            </defs>

            {/* Background Halo */}
            <circle cx="50" cy="40" r="38" fill={current.color} opacity="0.12" />
            <circle cx="50" cy="40" r="36" stroke={current.color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

            {/* Long Silky Hair (Back) */}
            <path d="M 22 45 C 18 20, 82 20, 78 45 C 76 65, 78 85, 82 105 L 18 105 C 22 85, 24 65, 22 45 Z" fill="url(#hairGrad)" />

            {/* Neck & Shoulders */}
            <path d="M 44 62 L 56 62 L 58 72 L 42 72 Z" fill="#FDBA74" />

            {/* 👕 Official JanMitra AI T-Shirt */}
            <path d="M 16 72 Q 50 68 84 72 L 90 120 L 10 120 Z" fill="url(#shirtGrad)" stroke="#38BDF8" strokeWidth="1.2" />
            <path d="M 38 72 L 50 82 L 62 72" stroke="#2563EB" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Indian Flag Emblem Badge */}
            <g transform="translate(24, 82)">
              <rect x="0" y="0" width="12" height="7" rx="1" fill="#FF9933" />
              <rect x="0" y="2.3" width="12" height="2.4" fill="#FFFFFF" />
              <circle cx="6" cy="3.5" r="1" fill="#000080" />
              <rect x="0" y="4.7" width="12" height="2.3" fill="#138808" />
            </g>

            {/* Logo Text */}
            <text x="56" y="87" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              JanMitra AI
            </text>
            <text x="56" y="93" textAnchor="middle" fill="#60A5FA" fontSize="4" fontWeight="600">
              CITIZEN ASSISTANT
            </text>

            {/* Face Contour */}
            <path d="M 30 38 C 30 18, 70 18, 70 38 C 70 56, 62 64, 50 64 C 38 64, 30 56, 30 38 Z" fill="url(#skinGrad)" />
            <path d="M 30 32 C 38 22, 50 26, 50 32 C 50 26, 62 22, 70 32 C 70 20, 30 20, 30 32 Z" fill="#0F172A" />

            {/* Eyebrows */}
            <path d="M 35 32 Q 42 29 46 32" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M 54 32 Q 58 29 65 32" stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

            {/* Eyes */}
            {blink ? (
              <>
                <line x1="36" y1="39" x2="46" y2="39" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="54" y1="39" x2="64" y2="39" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse cx="41" cy="39" rx="5" ry="3.5" fill="#FFFFFF" />
                <ellipse cx="59" cy="39" rx="5" ry="3.5" fill="#FFFFFF" />
                <circle cx={state === 'looking' ? '42' : '41'} cy="39" r="2.8" fill="#1E3A8A" />
                <circle cx={state === 'looking' ? '60' : '59'} cy="39" r="2.8" fill="#1E3A8A" />
                <circle cx={state === 'looking' ? '42' : '41'} cy="39" r="1.5" fill="#0F172A" />
                <circle cx={state === 'looking' ? '60' : '59'} cy="39" r="1.5" fill="#0F172A" />
                <circle cx="42.5" cy="38" r="0.8" fill="#FFFFFF" />
                <circle cx="60.5" cy="38" r="0.8" fill="#FFFFFF" />
              </>
            )}

            {/* Red Bindi */}
            <circle cx="50" cy="31" r="1.8" fill="#DC2626" />
            <path d="M 50 39 L 48.5 47 L 51.5 47" stroke="#EA580C" strokeWidth="1" opacity="0.6" strokeLinecap="round" fill="none" />
            <ellipse cx="36" cy="46" rx="4" ry="2" fill="#F43F5E" opacity="0.25" />
            <ellipse cx="64" cy="46" rx="4" ry="2" fill="#F43F5E" opacity="0.25" />

            {/* 💋 Phoneme Synced Moving Lips */}
            {state === 'speaking' ? (
              <path d={mouthPaths[phonemeStep]} fill="#E11D48" stroke="#9F1239" strokeWidth="1" />
            ) : state === 'listening' ? (
              <path d="M 43 53 Q 50 61 57 53" stroke="#BE123C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
            ) : (
              <path d="M 43 53 Q 50 59 57 53" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" fill="none" />
            )}
          </svg>
        </div>

        {/* Audio Equalizer synced when Janvi is Speaking */}
        {state === 'speaking' && (
          <div style={{ position: 'absolute', bottom: 10, display: 'flex', gap: 3, alignItems: 'flex-end', height: 18 }}>
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
