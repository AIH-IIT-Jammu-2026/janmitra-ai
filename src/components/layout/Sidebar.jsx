import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import LanguageSwitcher from '../common/LanguageSwitcher'

export default function Sidebar() {
  const location = useLocation()
  const { t } = useLanguage()

  const NAV_ITEMS = [
    { icon: '🏠', label: t('home'), path: '/' },
    { icon: '💬', label: t('chat'), path: '/chat' },
    { icon: '🧠', label: t('architecture'), path: '/architecture' },
  ]

  return (
    <div
      style={{
        width: 240,
        height: '100vh',
        position: 'sticky',
        top: 0,
        background: 'rgba(4,13,26,0.9)',
        borderRight: '1px solid rgba(56,189,248,0.1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 20,
      }}
    >
      {/* Brand Header */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(56,189,248,0.08)' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              boxShadow: '0 0 20px rgba(37,99,235,0.4)',
            }}
          >
            🇮🇳
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
              JanMitra AI
            </div>
            <div style={{ fontSize: 10, color: '#38BDF8', letterSpacing: 1.2, fontWeight: 600 }}>
              CITIZEN AGENTS
            </div>
          </div>
        </Link>
      </div>

      {/* Language Switcher in Sidebar */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(56,189,248,0.08)' }}>
        <LanguageSwitcher />
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 10,
                textDecoration: 'none',
                marginBottom: 6,
                background: isActive ? 'rgba(37,99,235,0.2)' : 'transparent',
                border: isActive ? '1px solid rgba(56,189,248,0.3)' : '1px solid transparent',
                color: isActive ? '#60A5FA' : 'rgba(240,246,255,0.65)',
                fontSize: 14,
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer Info */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(56,189,248,0.08)', fontSize: 11, color: 'rgba(240,246,255,0.4)' }}>
        AI Hackathon 2026 Build
      </div>
    </div>
  )
}
