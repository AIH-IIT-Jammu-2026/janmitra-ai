import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../App'

const NAV_ITEMS = [
  { icon: '⬡', label: 'Dashboard', path: '/dashboard' },
  { icon: '💬', label: 'Chat', path: '/chat' },
  { icon: '📁', label: 'Documents', path: '/documents' },
  { icon: '🏛️', label: 'Gov. Schemes', path: '/chat/schemes', query: 'What government schemes am I eligible for?' },
  { icon: '🩺', label: 'Healthcare', path: '/chat/health', query: 'I need health guidance' },
  { icon: '🎓', label: 'Education', path: '/chat/education', query: 'Show me scholarships' },
  { icon: '💼', label: 'Employment', path: '/chat/jobs', query: 'Help with my resume and job search' },
  { icon: '🌾', label: 'Agriculture', path: '/chat/agri', query: 'Show mandi prices and farming schemes' },
  { icon: '⚖️', label: 'Legal Help', path: '/chat/legal', query: 'I need legal assistance' },
  { icon: '🚨', label: 'Emergency', path: '/chat/emergency', query: 'Emergency! I need immediate help!' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [hovered, setHovered] = useState(null)

  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', zIndex: 10 }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(56,189,248,0.08)' }}>
        <Link to="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, boxShadow: '0 0 20px rgba(37,99,235,0.5)',
          }}>🇮🇳</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>JanMitra AI</div>
            <div style={{ fontSize: 10, color: 'rgba(240,246,255,0.4)', letterSpacing: 1 }}>CITIZEN INTELLIGENCE</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
          return (
            <motion.div
              key={item.path}
              onHoverStart={() => setHovered(item.path)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ x: 3 }}
              style={{ marginBottom: 2 }}
            >
              <Link
                to={item.path}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 12px', borderRadius: 10,
                  textDecoration: 'none',
                  background: isActive ? 'rgba(37,99,235,0.18)' : hovered === item.path ? 'rgba(255,255,255,0.04)' : 'transparent',
                  border: isActive ? '1px solid rgba(56,189,248,0.25)' : '1px solid transparent',
                  color: isActive ? '#60A5FA' : 'rgba(240,246,255,0.65)',
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: 16, width: 20, textAlign: 'center' }}>{item.icon}</span>
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: '#38BDF8', marginLeft: 'auto',
                      boxShadow: '0 0 8px #38BDF8',
                    }}
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(56,189,248,0.08)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', borderRadius: 10,
          background: 'rgba(255,255,255,0.04)',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'white',
            flexShrink: 0,
          }}>
            {user?.avatar || 'T'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F6FF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)' }}>Citizen</div>
          </div>
          <button
            onClick={() => { logout(); navigate('/') }}
            style={{ background: 'none', border: 'none', color: 'rgba(240,246,255,0.4)', cursor: 'pointer', fontSize: 14, padding: 4 }}
            title="Logout"
          >⏻</button>
        </div>
      </div>
    </div>
  )
}
