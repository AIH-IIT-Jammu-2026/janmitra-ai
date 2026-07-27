import React from 'react'
import { motion } from 'framer-motion'

export default function CallControls({
  listening,
  onToggleMic,
  isSharing,
  onToggleScreenShare,
  isCameraActive,
  onToggleCamera,
  onUploadDoc,
  onChangeLanguage,
  onEndSession,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: '14px 24px',
        background: 'rgba(7,26,53,0.92)',
        border: '1px solid rgba(56,189,248,0.25)',
        borderRadius: 24,
        backdropFilter: 'blur(20px)',
        boxShadow: '0 0 30px rgba(4,13,26,0.8)',
        flexWrap: 'wrap',
      }}
    >
      {/* 1. Mic Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggleMic}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 16px',
          borderRadius: 20,
          background: listening ? 'rgba(239,68,68,0.25)' : 'rgba(37,99,235,0.2)',
          border: `1px solid ${listening ? '#EF4444' : '#2563EB'}`,
          color: listening ? '#F87171' : '#60A5FA',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <span>{listening ? '🎙️ Stop Mic' : '🎤 Talk to Me'}</span>
      </motion.button>

      {/* 2. She Can See Me (Camera Video) */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggleCamera}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 16px',
          borderRadius: 20,
          background: isCameraActive ? 'rgba(16,185,129,0.25)' : 'rgba(11,36,71,0.8)',
          border: `1px solid ${isCameraActive ? '#10B981' : 'rgba(56,189,248,0.3)'}`,
          color: isCameraActive ? '#34D399' : '#F0F6FF',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <span>{isCameraActive ? '📷 Camera Active' : '📷 She Can See Me'}</span>
      </motion.button>

      {/* 3. Guide Screen Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onToggleScreenShare}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 16px',
          borderRadius: 20,
          background: isSharing ? 'rgba(6,182,212,0.25)' : 'rgba(11,36,71,0.8)',
          border: `1px solid ${isSharing ? '#06B6D4' : 'rgba(56,189,248,0.3)'}`,
          color: isSharing ? '#67E8F9' : '#F0F6FF',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <span>{isSharing ? '🖥️ Stop Screen' : '🖥️ Guide My Screen'}</span>
      </motion.button>

      {/* 4. Explain Document Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onUploadDoc}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 16px',
          borderRadius: 20,
          background: 'rgba(11,36,71,0.8)',
          border: '1px solid rgba(56,189,248,0.3)',
          color: '#F0F6FF',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <span>📄 Explain Document</span>
      </motion.button>

      {/* 5. Change Language Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onChangeLanguage}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 14px',
          borderRadius: 20,
          background: 'rgba(11,36,71,0.8)',
          border: '1px solid rgba(56,189,248,0.3)',
          color: '#F0F6FF',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        <span>🌐 22 Languages</span>
      </motion.button>

      {/* 6. End Session Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={onEndSession}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '10px 18px',
          borderRadius: 20,
          background: 'linear-gradient(135deg, #DC2626, #991B1B)',
          border: 'none',
          color: 'white',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 0 16px rgba(220,38,38,0.4)',
        }}
      >
        <span>❌ End Session</span>
      </motion.button>
    </div>
  )
}
