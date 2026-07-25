import React from 'react'
import { motion } from 'framer-motion'
import janviAvatarReal from '../../assets/janvi_avatar_real.png'

export default function JanviAvatar({ state = 'idle' }) {
  // State Visual Configurations
  const stateConfig = {
    idle: {
      color: '#38BDF8',
      glow: 'rgba(56,189,248,0.5)',
      badgeBg: 'rgba(56,189,248,0.15)',
      badgeBorder: 'rgba(56,189,248,0.4)',
      statusTag: '● LIVE',
      text: '😊 Janvi Online · Ready',
    },
    listening: {
      color: '#2563EB',
      glow: 'rgba(37,99,235,0.8)',
      badgeBg: 'rgba(37,99,235,0.25)',
      badgeBorder: 'rgba(37,99,235,0.6)',
      statusTag: '👂 Listening...',
      text: '🎤 Listening to Citizen Voice',
    },
    looking: {
      color: '#06B6D4',
      glow: 'rgba(6,182,212,0.85)',
      badgeBg: 'rgba(6,182,212,0.25)',
      badgeBorder: 'rgba(6,182,212,0.6)',
      statusTag: '👀 Vision Scanning...',
      text: '👀 Analyzing Screen Webpage',
    },
    thinking: {
      color: '#8B5CF6',
      glow: 'rgba(139,92,246,0.85)',
      badgeBg: 'rgba(139,92,246,0.25)',
      badgeBorder: 'rgba(139,92,246,0.6)',
      statusTag: '🧠 Thinking...',
      text: '🧠 Consulting Multi-Agent Engine',
    },
    speaking: {
      color: '#10B981',
      glow: 'rgba(16,185,129,0.85)',
      badgeBg: 'rgba(16,185,129,0.25)',
      badgeBorder: 'rgba(16,185,129,0.6)',
      statusTag: '🔊 Speaking...',
      text: '🗣 Janvi Responding',
    },
  }

  const current = stateConfig[state] || stateConfig.idle

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%' }}>
      {/* Outer Ambient Glowing Halo */}
      <motion.div
        animate={{
          scale: state === 'speaking' ? [1, 1.14, 1] : state === 'listening' ? [1, 1.18, 1] : [1, 1.05, 1],
          opacity: [0.55, 0.9, 0.55],
        }}
        transition={{ duration: state === 'speaking' ? 0.35 : 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 230,
          height: 280,
          borderRadius: 36,
          position: 'absolute',
          top: -12,
          background: `radial-gradient(circle, ${current.glow} 0%, transparent 75%)`,
          zIndex: 1,
          filter: 'blur(18px)',
        }}
      />

      {/* Main 3D Card Container (Real Janvi Photorealistic Portrait in JanMitra Polo) */}
      <motion.div
        animate={
          state === 'speaking'
            ? { y: [0, -6, 0, -3, 0], rotate: [0, 1, -1, 0] }
            : state === 'looking'
            ? { rotate: [-1, 2, -2, 1], scale: [1, 1.02, 1] }
            : state === 'thinking'
            ? { y: [0, -4, 0], rotate: [0, -1.5, 1.5, 0] }
            : { y: [0, -5, 0], rotate: [-1, 1, -1] }
        }
        transition={{ duration: state === 'speaking' ? 0.5 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 245,
          height: 285,
          borderRadius: 24,
          background: 'linear-gradient(145deg, rgba(7,26,53,0.98), rgba(11,36,71,0.95))',
          border: `2px solid ${current.color}`,
          boxShadow: `0 0 45px ${current.glow}, inset 0 0 25px rgba(56,189,248,0.2)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(24px)',
          overflow: 'hidden',
        }}
      >
        {/* Live Call Badge */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '5px 12px',
            borderRadius: 14,
            background: 'rgba(4,13,26,0.9)',
            border: `1px solid ${current.color}60`,
            fontSize: 11,
            fontWeight: 800,
            color: current.color,
            zIndex: 12,
            boxShadow: `0 0 12px ${current.glow}`,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: current.color, boxShadow: `0 0 10px ${current.color}` }} />
          <span>{current.statusTag}</span>
        </div>

        {/* Vision Laser HUD Scanner Line when in Vision Mode */}
        {state === 'looking' && (
          <motion.div
            animate={{ y: [-140, 140, -140] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '100%',
              height: 3.5,
              background: 'linear-gradient(90deg, transparent, #06B6D4, #67E8F9, transparent)',
              boxShadow: '0 0 20px #06B6D4',
              zIndex: 10,
            }}
          />
        )}

        {/* Real Janvi AI Girl Image Frame (Clean Photorealistic Portrait in JanMitra Polo) */}
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
        </div>

        {/* Audio Equalizer Synced when Janvi is Speaking */}
        {state === 'speaking' && (
          <div style={{ position: 'absolute', bottom: 12, display: 'flex', gap: 3, alignItems: 'flex-end', height: 20, zIndex: 12 }}>
            {[12, 20, 10, 22, 14, 18, 8, 16, 12, 20].map((h, i) => (
              <motion.div
                key={i}
                style={{ width: 3, background: '#10B981', borderRadius: 2 }}
                animate={{ height: [4, h, 4] }}
                transition={{ duration: 0.28, repeat: Infinity, delay: i * 0.04 }}
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
