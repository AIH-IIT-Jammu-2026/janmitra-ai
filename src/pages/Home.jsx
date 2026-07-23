import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #040d1a 0%, #071A35 50%, #040d1a 100%)',
        color: '#F0F6FF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          boxShadow: '0 0 40px rgba(37,99,235,0.6)',
          marginBottom: 24,
        }}
      >
        🇮🇳
      </div>

      <h1
        style={{
          fontSize: 42,
          fontWeight: 800,
          fontFamily: 'Space Grotesk, sans-serif',
          background: 'linear-gradient(135deg, #FFFFFF, #60A5FA)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 16,
        }}
      >
        JanMitra AI
      </h1>

      <p style={{ fontSize: 18, color: 'rgba(240,246,255,0.7)', maxWidth: 600, lineHeight: 1.6, marginBottom: 32 }}>
        Multi-Agent AI Assistant empowering Indian citizens with instant access to government schemes, healthcare, education, agriculture, and legal guidance.
      </p>

      <div style={{ display: 'flex', gap: 16 }}>
        <Link
          to="/chat"
          style={{
            padding: '14px 28px',
            borderRadius: 12,
            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            color: 'white',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: 16,
            boxShadow: '0 0 24px rgba(37,99,235,0.5)',
          }}
        >
          Launch AI Assistant ➔
        </Link>
        <Link
          to="/architecture"
          style={{
            padding: '14px 28px',
            borderRadius: 12,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(56,189,248,0.2)',
            color: '#60A5FA',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: 16,
          }}
        >
          System Architecture
        </Link>
      </div>
    </div>
  )
}
