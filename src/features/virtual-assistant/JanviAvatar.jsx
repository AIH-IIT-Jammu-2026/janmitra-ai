import React from 'react'
import { motion } from 'framer-motion'

export default function JanviAvatar({ state = 'idle' }) {
  // State colors & icons
  const stateConfig = {
    idle: { color: '#38BDF8', glow: 'rgba(56,189,248,0.4)', text: '😊 Janvi Online · Ready', badge: 'Idle' },
    listening: { color: '#2563EB', glow: 'rgba(37,99,235,0.7)', text: '🎤 Listening to Citizen...', badge: 'Listening' },
    looking: { color: '#06B6D4', glow: 'rgba(6,182,212,0.8)', text: '👀 Janvi Seeing Your Screen & Camera...', badge: 'Vision Active' },
    thinking: { color: '#8B5CF6', glow: 'rgba(139,92,246,0.8)', text: '🧠 Consulting AI Specialists...', badge: 'Reasoning' },
    speaking: { color: '#10B981', glow: 'rgba(16,185,129,0.8)', text: '🗣️ Janvi Speaking...', badge: 'Voice Output' },
  }

  const current = stateConfig[state] || stateConfig.idle

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      {/* Outer Pulse Glow Ring */}
      <motion.div
        animate={{
          scale: state === 'speaking' ? [1, 1.15, 1] : state === 'listening' ? [1, 1.2, 1] : [1, 1.05, 1],
          opacity: [0.5, 0.85, 0.5],
        }}
        transition={{ duration: state === 'speaking' ? 0.6 : 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 170,
          height: 170,
          borderRadius: '50%',
          position: 'absolute',
          top: -12,
          background: `radial-gradient(circle, ${current.glow} 0%, transparent 70%)`,
          zIndex: 1,
        }}
      />

      {/* Main Avatar Card (Janvi wearing JanMitra AI T-Shirt) */}
      <motion.div
        animate={
          state === 'looking'
            ? { rotate: [0, 5, -5, 0] }
            : state === 'thinking'
            ? { scale: [1, 1.03, 1] }
            : { y: [0, -3, 0] }
        }
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 150,
          height: 180,
          borderRadius: 24,
          background: 'linear-gradient(135deg, rgba(7,26,53,0.95), rgba(11,36,71,0.9))',
          border: `2px solid ${current.color}`,
          boxShadow: `0 0 30px ${current.glow}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          backdropFilter: 'blur(10px)',
          overflow: 'hidden',
          paddingTop: 10,
        }}
      >
        {/* Animated Avatar Character (Wearing JanMitra AI T-Shirt) */}
        <svg width="120" height="150" viewBox="0 0 100 120" fill="none">
          {/* Glowing Aura Ring */}
          <circle cx="50" cy="40" r="34" stroke={current.color} strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />

          {/* Hair & Head */}
          <path d="M 26 40 C 26 18, 74 18, 74 40 C 74 52, 68 56, 50 56 C 32 56, 26 52, 26 40 Z" fill="#1E293B" />
          <ellipse cx="50" cy="40" rx="20" ry="22" fill="#FDE047" opacity="0.15" />

          {/* Face Contour */}
          <ellipse cx="50" cy="42" rx="18" ry="20" fill="#FED7AA" />

          {/* Eyes with Blinking Animation */}
          <motion.ellipse
            cx="42"
            cy="40"
            rx="3"
            ry="4"
            fill="#0F172A"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }}
          />
          <motion.ellipse
            cx="58"
            cy="40"
            rx="3"
            ry="4"
            fill="#0F172A"
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2 }}
          />

          {/* Eye Pupils */}
          <circle cx="43" cy="40" r="1.5" fill={current.color} />
          <circle cx="59" cy="40" r="1.5" fill={current.color} />

          {/* Red Bindi */}
          <circle cx="50" cy="32" r="1.8" fill="#EF4444" />

          {/* Mouth */}
          {state === 'speaking' ? (
            <motion.path
              d="M 43 52 Q 50 62 57 52 Q 50 56 43 52 Z"
              fill="#DC2626"
              animate={{ d: ["M 43 52 Q 50 62 57 52 Q 50 56 43 52 Z", "M 43 52 Q 50 66 57 52 Q 50 58 43 52 Z"] }}
              transition={{ duration: 0.25, repeat: Infinity, repeatType: 'reverse' }}
            />
          ) : (
            <path d="M 44 52 Q 50 57 56 52" stroke="#B91C1C" strokeWidth="2" strokeLinecap="round" />
          )}

          {/* Neck */}
          <rect x="46" y="60" width="8" height="8" fill="#FDBA74" />

          {/* 👕 Official JanMitra AI T-Shirt (Navy Blue Polo with Indian Flag & Logo) */}
          <path d="M 22 68 L 34 65 L 50 67 L 66 65 L 78 68 L 84 95 L 16 95 Z" fill="#071A35" stroke="#38BDF8" strokeWidth="1.2" />

          {/* T-Shirt Collar */}
          <path d="M 40 66 L 50 74 L 60 66" stroke="#2563EB" strokeWidth="2" fill="none" />

          {/* Indian Flag Emblem Badge on Left Chest */}
          <rect x="30" y="74" width="10" height="6" rx="1" fill="#FF9933" />
          <rect x="30" y="76" width="10" height="2" fill="#FFFFFF" />
          <circle cx="35" cy="77" r="0.8" fill="#000080" />
          <rect x="30" y="78" width="10" height="2" fill="#138808" />

          {/* "JanMitra AI" Printed Text on T-Shirt */}
          <text x="50" y="85" textAnchor="middle" fill="#38BDF8" fontSize="6" fontWeight="bold" fontFamily="Space Grotesk, sans-serif">
            JanMitra AI
          </text>
          <text x="50" y="91" textAnchor="middle" fill="#60A5FA" fontSize="4" fontWeight="600">
            CITIZEN ASSISTANT
          </text>
        </svg>

        {/* Audio Wave animation when speaking */}
        {state === 'speaking' && (
          <div style={{ position: 'absolute', bottom: 6, display: 'flex', gap: 3, alignItems: 'flex-end', height: 16 }}>
            {[10, 16, 10, 18, 12, 14].map((h, i) => (
              <motion.div
                key={i}
                style={{ width: 2.5, background: '#10B981', borderRadius: 2 }}
                animate={{ height: [4, h, 4] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.08 }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Avatar Status Text Badge */}
      <div
        style={{
          marginTop: 12,
          padding: '5px 14px',
          borderRadius: 20,
          background: 'rgba(11,36,71,0.9)',
          border: `1px solid ${current.color}50`,
          fontSize: 11,
          fontWeight: 600,
          color: current.color,
          boxShadow: `0 0 14px ${current.glow}`,
          position: 'relative',
          zIndex: 3,
        }}
      >
        {current.text}
      </div>
    </div>
  )
}
