import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function JanviAvatar({ state = 'idle' }) {
  const [phonemeStep, setPhonemeStep] = useState(0)
  const [blink, setBlink] = useState(false)
  const [gaze, setGaze] = useState({ x: 0, y: 0 })

  // 1. Lip-Sync Mouth Morphing Loop when Speaking
  useEffect(() => {
    let timer
    if (state === 'speaking') {
      timer = setInterval(() => {
        setPhonemeStep((prev) => (prev + 1) % 5)
      }, 110)
    } else {
      setPhonemeStep(0)
    }
    return () => clearInterval(timer)
  }, [state])

  // 2. Natural Eye Blinking Loop
  useEffect(() => {
    const blinkTimer = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 160)
    }, 3200)
    return () => clearInterval(blinkTimer)
  }, [])

  // 3. Mouse Gaze Tracking effect when idle or looking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const x = ((e.clientX / innerWidth) - 0.5) * 3
      const y = ((e.clientY / innerHeight) - 0.5) * 2
      setGaze({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // State Visual Configurations
  const stateConfig = {
    idle: {
      color: '#38BDF8',
      glow: 'rgba(56,189,248,0.5)',
      badgeBg: 'rgba(56,189,248,0.15)',
      badgeBorder: 'rgba(56,189,248,0.4)',
      text: '😊 Janvi Online · Ready',
      statusTag: '● Connected',
      eyebrowY: 0,
      headRotate: 0,
    },
    listening: {
      color: '#2563EB',
      glow: 'rgba(37,99,235,0.75)',
      badgeBg: 'rgba(37,99,235,0.2)',
      badgeBorder: 'rgba(37,99,235,0.5)',
      text: '👂 Listening to You...',
      statusTag: '🎙 Listening',
      eyebrowY: -2,
      headRotate: 2,
    },
    looking: {
      color: '#06B6D4',
      glow: 'rgba(6,182,212,0.85)',
      badgeBg: 'rgba(6,182,212,0.2)',
      badgeBorder: 'rgba(6,182,212,0.5)',
      text: '👀 Looking at your screen...',
      statusTag: '🔍 Vision Scanning',
      eyebrowY: -1,
      headRotate: -2,
    },
    thinking: {
      color: '#8B5CF6',
      glow: 'rgba(139,92,246,0.85)',
      badgeBg: 'rgba(139,92,246,0.2)',
      badgeBorder: 'rgba(139,92,246,0.5)',
      text: '🧠 Thinking...',
      statusTag: '🤖 Reasoning',
      eyebrowY: -3,
      headRotate: 3,
    },
    speaking: {
      color: '#10B981',
      glow: 'rgba(16,185,129,0.85)',
      badgeBg: 'rgba(16,185,129,0.2)',
      badgeBorder: 'rgba(16,185,129,0.5)',
      text: '🗣 Janvi Speaking...',
      statusTag: '🗣 Voice Output',
      eyebrowY: -1,
      headRotate: 0,
    },
  }

  const current = stateConfig[state] || stateConfig.idle

  // Phoneme Mouth Morphing Paths (Closed, Open A, Wide E, Round O, Neutral Smile)
  const mouthPhonemePaths = [
    'M 43 53 Q 50 59 57 53 Z', // Phoneme M (Closed Smile)
    'M 40 52 Q 50 67 60 52 Q 50 58 40 52 Z', // Phoneme A (Wide Open)
    'M 42 53 Q 50 57 58 53 Q 50 64 42 53 Z', // Phoneme E (Smile Open)
    'M 44 52 Q 50 64 56 52 Q 50 57 44 52 Z', // Phoneme O (Rounded)
    'M 42 53 Q 50 61 58 53 Q 50 57 42 53 Z', // Phoneme U / I (Neutral)
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%' }}>
      {/* Outer Ambient Glowing Halo */}
      <motion.div
        animate={{
          scale: state === 'speaking' ? [1, 1.12, 1] : state === 'listening' ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{ duration: state === 'speaking' ? 0.4 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 220,
          height: 270,
          borderRadius: 32,
          position: 'absolute',
          top: -10,
          background: `radial-gradient(circle, ${current.glow} 0%, transparent 75%)`,
          zIndex: 1,
          filter: 'blur(16px)',
        }}
      />

      {/* Main 3D Animated Avatar Card (Procedural Live2D Engine) */}
      <motion.div
        animate={
          state === 'speaking'
            ? { y: [0, -6, 0, -3, 0], rotate: [0, 1.5, -1.5, 0] }
            : state === 'looking'
            ? { rotate: [-1, 2, -2, 1], scale: [1, 1.02, 1] }
            : state === 'thinking'
            ? { y: [0, -4, 0], rotate: [0, -2, 2, 0] }
            : { y: [0, -5, 0], rotate: [-1, 1, -1] }
        }
        transition={{ duration: state === 'speaking' ? 0.6 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 240,
          height: 280,
          borderRadius: 24,
          background: 'linear-gradient(145deg, rgba(7,26,53,0.95), rgba(11,36,71,0.9))',
          border: `2px solid ${current.color}`,
          boxShadow: `0 0 40px ${current.glow}, inset 0 0 20px rgba(56,189,248,0.15)`,
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
        {/* Top Video-Call Status Tag */}
        <div
          style={{
            position: 'absolute',
            top: 12,
            left: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            borderRadius: 12,
            background: 'rgba(4,13,26,0.85)',
            border: `1px solid ${current.color}50`,
            fontSize: 11,
            fontWeight: 700,
            color: current.color,
            zIndex: 12,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: current.color, boxShadow: `0 0 8px ${current.color}` }} />
          <span>{current.statusTag}</span>
        </div>

        {/* Vision Laser Scanner Effect */}
        {state === 'looking' && (
          <motion.div
            animate={{ y: [-140, 140, -140] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '100%',
              height: 3,
              background: 'linear-gradient(90deg, transparent, #06B6D4, #67E8F9, transparent)',
              boxShadow: '0 0 20px #06B6D4',
              zIndex: 10,
            }}
          />
        )}

        {/* Live2D Vector Avatar Face & Body (Wearing JanMitra AI T-Shirt) */}
        <div style={{ position: 'relative', width: 200, height: 240, display: 'flex', justifyContent: 'center' }}>
          <svg width="200" height="240" viewBox="0 0 100 120" fill="none">
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

            {/* Glowing Aura Ring */}
            <circle cx="50" cy="40" r="38" fill={current.color} opacity="0.12" />
            <circle cx="50" cy="40" r="36" stroke={current.color} strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

            {/* Long Silky Hair (Back) */}
            <path d="M 22 45 C 18 20, 82 20, 78 45 C 76 65, 78 85, 82 105 L 18 105 C 22 85, 24 65, 22 45 Z" fill="url(#hairGrad)" />

            {/* Neck & Shoulders */}
            <path d="M 44 62 L 56 62 L 58 72 L 42 72 Z" fill="#FDBA74" />

            {/* 👕 Official JanMitra AI Polo T-Shirt */}
            <path d="M 16 72 Q 50 68 84 72 L 90 120 L 10 120 Z" fill="url(#shirtGrad)" stroke="#38BDF8" strokeWidth="1.2" />
            <path d="M 38 72 L 50 82 L 62 72" stroke="#2563EB" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Indian Flag Emblem Badge */}
            <g transform="translate(24, 82)">
              <rect x="0" y="0" width="12" height="7" rx="1" fill="#FF9933" />
              <rect x="0" y="2.3" width="12" height="2.4" fill="#FFFFFF" />
              <circle cx="6" cy="3.5" r="1" fill="#000080" />
              <rect x="0" y="4.7" width="12" height="2.3" fill="#138808" />
            </g>

            {/* JanMitra AI Printed Logo Text */}
            <text x="56" y="87" textAnchor="middle" fill="#38BDF8" fontSize="6.5" fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
              JanMitra AI
            </text>
            <text x="56" y="93" textAnchor="middle" fill="#60A5FA" fontSize="4" fontWeight="600">
              CITIZEN ASSISTANT
            </text>

            {/* Face Contour (Tilts dynamically with headRotate) */}
            <g transform={`rotate(${current.headRotate}, 50, 40)`}>
              <path d="M 30 38 C 30 18, 70 18, 70 38 C 70 56, 62 64, 50 64 C 38 64, 30 56, 30 38 Z" fill="url(#skinGrad)" />
              <path d="M 30 32 C 38 22, 50 26, 50 32 C 50 26, 62 22, 70 32 C 70 20, 30 20, 30 32 Z" fill="#0F172A" />

              {/* Eyebrows (Moves up/down based on state) */}
              <path d={`M 35 ${32 + current.eyebrowY} Q 42 ${29 + current.eyebrowY} 46 ${32 + current.eyebrowY}`} stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              <path d={`M 54 ${32 + current.eyebrowY} Q 58 ${29 + current.eyebrowY} 65 ${32 + current.eyebrowY}`} stroke="#1E293B" strokeWidth="1.8" strokeLinecap="round" fill="none" />

              {/* Realistic Eyes with Blinking & Dynamic Gaze Tracking */}
              {blink ? (
                <>
                  <line x1="36" y1="39" x2="46" y2="39" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="54" y1="39" x2="64" y2="39" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <ellipse cx="41" cy="39" rx="5" ry="3.5" fill="#FFFFFF" />
                  <ellipse cx="59" cy="39" rx="5" ry="3.5" fill="#FFFFFF" />

                  {/* Irises & Pupils (Tracking Gaze) */}
                  <circle cx={41 + gaze.x} cy={39 + gaze.y} r="2.8" fill="#1E3A8A" />
                  <circle cx={59 + gaze.x} cy={39 + gaze.y} r="2.8" fill="#1E3A8A" />
                  <circle cx={41 + gaze.x} cy={39 + gaze.y} r="1.5" fill="#0F172A" />
                  <circle cx={59 + gaze.x} cy={39 + gaze.y} r="1.5" fill="#0F172A" />
                  <circle cx={42.5 + gaze.x} cy={38 + gaze.y} r="0.8" fill="#FFFFFF" />
                  <circle cx={60.5 + gaze.x} cy={38 + gaze.y} r="0.8" fill="#FFFFFF" />
                </>
              )}

              {/* Indian Red Bindi */}
              <circle cx="50" cy="31" r="1.8" fill="#DC2626" />
              <path d="M 50 39 L 48.5 47 L 51.5 47" stroke="#EA580C" strokeWidth="1" opacity="0.6" strokeLinecap="round" fill="none" />
              <ellipse cx="36" cy="46" rx="4" ry="2" fill="#F43F5E" opacity="0.25" />
              <ellipse cx="64" cy="46" rx="4" ry="2" fill="#F43F5E" opacity="0.25" />

              {/* 💋 Phoneme Synced Moving Mouth Morphing */}
              {state === 'speaking' ? (
                <path d={mouthPhonemePaths[phonemeStep]} fill="#E11D48" stroke="#9F1239" strokeWidth="1" />
              ) : state === 'listening' ? (
                <path d="M 43 53 Q 50 61 57 53" stroke="#BE123C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M 43 53 Q 50 59 57 53" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" fill="none" />
              )}
            </g>
          </svg>
        </div>

        {/* Audio Equalizer synced when Janvi is Speaking */}
        {state === 'speaking' && (
          <div style={{ position: 'absolute', bottom: 12, display: 'flex', gap: 3, alignItems: 'flex-end', height: 18, zIndex: 12 }}>
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
          background: current.badgeBg,
          border: `1px solid ${current.badgeBorder}`,
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
