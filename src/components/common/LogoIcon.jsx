import React from 'react'

export default function LogoIcon({ size = 38, glow = true }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: 'linear-gradient(135deg, rgba(7,26,53,0.95), rgba(11,36,71,0.9))',
        border: '1px solid rgba(56,189,248,0.35)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxShadow: glow ? '0 0 20px rgba(37,99,235,0.4), inset 0 0 10px rgba(56,189,248,0.15)' : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Navy Blue Glassmorphic Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Official Assistant Logo Line Art (Female Assistant with Ponytail & Badge) */}
      <svg
        width={Math.round(size * 0.72)}
        height={Math.round(size * 0.72)}
        viewBox="0 0 100 100"
        fill="none"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Hair & Ponytail */}
        <path
          d="M 38 42 C 38 22, 62 22, 62 42 C 62 48, 68 32, 75 42 C 82 52, 76 68, 70 75 C 66 70, 68 58, 62 50 C 62 52, 54 55, 38 55 Z"
          stroke="#60A5FA"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Head Contour */}
        <path
          d="M 38 42 C 38 28, 62 28, 62 42 C 62 56, 56 62, 50 62 C 44 62, 38 56, 38 42 Z"
          stroke="#F0F6FF"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Eyes */}
        <circle cx="44" cy="42" r="2.5" fill="#38BDF8" />
        <circle cx="56" cy="42" r="2.5" fill="#38BDF8" />

        {/* Smile */}
        <path d="M 44 50 Q 50 55 56 50" stroke="#F0F6FF" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Shoulders & JanMitra Badge T-Shirt */}
        <path
          d="M 25 82 C 28 68, 38 66, 50 66 C 62 66, 72 68, 75 82"
          stroke="#60A5FA"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* JanMitra Chest Badge */}
        <rect x="56" y="73" width="10" height="6" rx="1.5" fill="#2563EB" stroke="#38BDF8" strokeWidth="1" />
      </svg>
    </div>
  )
}
