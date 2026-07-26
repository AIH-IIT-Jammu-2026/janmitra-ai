import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import LanguageSwitcher from '../common/LanguageSwitcher'
import LogoIcon from '../common/LogoIcon'
import TrustCenterModal from '../common/TrustCenterModal'
import { supabase, isSupabaseConfigured } from '../../clients/supabaseClient'

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [showTrustCenter, setShowTrustCenter] = useState(false)

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('janmitra_user_name') || localStorage.getItem('user_name') || 'Sanskruti'
  })

  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getUser().then(({ data }) => {
        if (data?.user) {
          const fullName = data.user.user_metadata?.full_name || data.user.email?.split('@')[0]
          if (fullName) {
            setUserName(fullName)
            localStorage.setItem('janmitra_user_name', fullName)
          }
        }
      }).catch(() => {})
    }
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem('janmitra_user_name')
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut()
      } catch (err) {
        console.warn('Sign out error:', err)
      }
    }
    navigate('/login')
  }

  const NAV_ITEMS = [
    { icon: '🏠', label: t('home'), path: '/' },
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
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
          <LogoIcon size={38} />
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

      {/* Profile Section */}
      <div
        style={{
          padding: '14px',
          borderTop: '1px solid rgba(56,189,248,0.12)',
          background: 'rgba(11,36,71,0.5)',
          margin: 'auto 12px 16px 12px',
          borderRadius: 14,
          border: '1px solid rgba(56,189,248,0.2)',
          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 15,
              fontWeight: 700,
              color: '#FFFFFF',
              boxShadow: '0 0 12px rgba(37,99,235,0.4)',
              flexShrink: 0,
            }}
          >
            {userName ? userName.charAt(0).toUpperCase() : '👤'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#F0F6FF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: 'Space Grotesk, sans-serif',
              }}
            >
              Namaste, {userName}!
            </div>
            <div style={{ fontSize: 11, color: '#34D399', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2, fontWeight: 500 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px #34D399' }} />
              Active Citizen
            </div>
          </div>
        </div>

        {/* Profile Action Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 10, borderTop: '1px solid rgba(56,189,248,0.1)' }}>
          <Link
            to="/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              color: location.pathname === '/dashboard' ? '#60A5FA' : 'rgba(240,246,255,0.8)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: location.pathname === '/dashboard' ? 'rgba(37,99,235,0.2)' : 'transparent',
            }}
          >
            <span>📊</span> My Dashboard
          </Link>

          <Link
            to="/documents"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              color: location.pathname === '/documents' ? '#60A5FA' : 'rgba(240,246,255,0.8)',
              textDecoration: 'none',
              transition: 'all 0.2s',
              background: location.pathname === '/documents' ? 'rgba(37,99,235,0.2)' : 'transparent',
            }}
          >
            <span>👤</span> My Account
          </Link>

          <button
            onClick={() => setShowTrustCenter(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              color: '#34D399',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span>🛡️</span> Privacy & Security
          </button>

          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 10px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              color: '#F87171',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span>🚪</span> Log Out
          </button>
        </div>
      </div>

      <TrustCenterModal
        show={showTrustCenter}
        onClose={() => setShowTrustCenter(false)}
      />
    </div>
  )
}
