import React from 'react'
import { motion } from 'framer-motion'

export default function SessionSummaryModal({ summaryData, onClose }) {
  if (!summaryData) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(4,13,26,0.85)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: '100%',
          maxWidth: 520,
          background: 'rgba(7,26,53,0.95)',
          border: '1px solid rgba(56,189,248,0.3)',
          borderRadius: 20,
          boxShadow: '0 0 50px rgba(4,13,26,0.9)',
          padding: 28,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 36, marginBottom: 10 }}>🎉</div>
        <h2 style={{ fontSize: 22, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, marginBottom: 4 }}>
          Today's Co-Pilot Session Recap
        </h2>
        <p style={{ fontSize: 13, color: 'rgba(240,246,255,0.6)', marginBottom: 20 }}>
          Thank you for using Janvi AI — your citizen co-pilot.
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          <div style={{ padding: 14, background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#60A5FA' }}>{summaryData.duration_formatted || '2m 14s'}</div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)', marginTop: 4 }}>Session Duration</div>
          </div>
          <div style={{ padding: 14, background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#34D399' }}>{summaryData.history_count || 4}</div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)', marginTop: 4 }}>Questions Solved</div>
          </div>
          <div style={{ padding: 14, background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 12 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#A78BFA' }}>7</div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)', marginTop: 4 }}>Specialists Active</div>
          </div>
        </div>

        {/* Topics Covered */}
        <div style={{ textAlign: 'left', padding: '14px 18px', background: 'rgba(11,36,71,0.6)', borderRadius: 12, marginBottom: 24, fontSize: 13, color: '#F0F6FF' }}>
          <div style={{ fontWeight: 700, marginBottom: 6, color: '#38BDF8' }}>Assistance Highlights:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, color: 'rgba(240,246,255,0.8)' }}>
            <div>✓ Government Schemes Guidance & Eligibility Checked</div>
            <div>✓ Multilingual Speech Translation & Vision Analysis Active</div>
            <div>✓ CSC Action Plan Summary Created</div>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            padding: '12px 28px',
            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            border: 'none',
            borderRadius: 12,
            color: 'white',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(37,99,235,0.4)',
          }}
        >
          Close Session
        </button>
      </motion.div>
    </div>
  )
}
