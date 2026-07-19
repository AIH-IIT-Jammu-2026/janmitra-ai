import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NeuralBackground from '../components/NeuralBackground'
import Sidebar from '../components/Sidebar'
import { useAuth } from '../App'

const QUICK_ACTIONS = [
  { icon: '🏛️', label: 'Government Schemes', desc: 'Find schemes you qualify for', color: '#2563EB', query: 'I am a farmer from Maharashtra. Which government schemes am I eligible for?', path: '/chat' },
  { icon: '🩺', label: 'Healthcare', desc: 'Health guidance & hospitals', color: '#10B981', query: 'I have fever and headache. What should I do?', path: '/chat' },
  { icon: '🎓', label: 'Education', desc: 'Scholarships & career path', color: '#8B5CF6', query: 'I am a student looking for scholarships and career guidance.', path: '/chat' },
  { icon: '💼', label: 'Employment', desc: 'Resume, jobs & skills', color: '#F59E0B', query: 'Please review my resume and suggest improvements.', path: '/chat' },
  { icon: '🌾', label: 'Agriculture', desc: 'Crop & mandi prices', color: '#22C55E', query: 'Show me current mandi prices and farming schemes in Maharashtra.', path: '/chat' },
  { icon: '⚖️', label: 'Legal Help', desc: 'Rights & legal guidance', color: '#EF4444', query: 'I need legal assistance with consumer rights and FIR filing.', path: '/chat' },
  { icon: '🚨', label: 'Emergency', desc: 'Immediate help & SOS', color: '#DC2626', query: 'Emergency! I need immediate help!', path: '/chat' },
]

const RECENT_CONVERSATIONS = [
  { icon: '🌾', title: 'PM-KISAN Eligibility Check', time: '2 hours ago', agent: 'Agriculture Agent' },
  { icon: '🏛️', title: 'Pradhan Mantri Awas Yojana', time: 'Yesterday', agent: 'Government Agent' },
  { icon: '🩺', title: 'Ayushman Bharat Registration', time: '2 days ago', agent: 'Healthcare Agent' },
  { icon: '💼', title: 'Resume Analysis & Job Search', time: '3 days ago', agent: 'Employment Agent' },
]

const STATS = [
  { value: '₹12,000', label: 'Benefits Found', icon: '💰' },
  { value: '7', label: 'Active Schemes', icon: '📋' },
  { value: '3', label: 'Saved Documents', icon: '📁' },
  { value: '100%', label: 'Verified Info', icon: '✅' },
]

const RECOMMENDATIONS = [
  { title: 'PM Ujjwala Yojana', desc: 'Free LPG connection for BPL households', match: '94%', icon: '🔥' },
  { title: 'Atal Pension Yojana', desc: 'Guaranteed pension scheme for workers', match: '87%', icon: '👴' },
  { title: 'Startup India Scheme', desc: 'Benefits for new entrepreneurs', match: '82%', icon: '🚀' },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState('Good morning')

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('Good morning')
    else if (h < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  const handleAction = (action) => {
    navigate('/chat', { state: { initialQuery: action.query } })
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content" style={{ position: 'relative', minHeight: '100vh' }}>
        <NeuralBackground />
        <div style={{ position: 'relative', zIndex: 2, padding: '32px 32px', maxWidth: 1200 }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 4 }}>
                  {greeting}, {user?.name} 👋
                </h1>
                <p style={{ color: 'rgba(240,246,255,0.5)', fontSize: 15 }}>
                  How can JanMitra AI assist you today?
                </p>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ padding: '6px 14px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, fontSize: 12, color: '#34D399', fontWeight: 500 }}>
                  ● All Systems Operational
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}
          >
            {STATS.map((s, i) => (
              <motion.div key={s.label} whileHover={{ y: -3 }} className="glass-card" style={{ padding: '20px 20px' }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#60A5FA', fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.45)', marginTop: 2 }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'rgba(240,246,255,0.7)', marginBottom: 16, letterSpacing: 0.5 }}>
              QUICK ACTIONS
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14 }}>
              {QUICK_ACTIONS.map((action, i) => (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="glass-card"
                  onClick={() => handleAction(action)}
                  style={{
                    padding: '20px 16px', cursor: 'pointer', textAlign: 'center',
                    border: `1px solid rgba(${action.color === '#2563EB' ? '37,99,235' : action.color === '#10B981' ? '16,185,129' : '255,255,255'},0.12)`,
                    transition: 'all 0.25s',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${action.color}20`,
                    border: `1px solid ${action.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, margin: '0 auto 12px',
                  }}>{action.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F6FF', marginBottom: 4 }}>{action.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)', lineHeight: 1.4 }}>{action.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

            {/* Recent Conversations */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'rgba(240,246,255,0.7)', marginBottom: 14, letterSpacing: 0.5 }}>RECENT CONVERSATIONS</h2>
              <div className="glass-card" style={{ overflow: 'hidden' }}>
                {RECENT_CONVERSATIONS.map((conv, i) => (
                  <motion.div
                    key={conv.title}
                    whileHover={{ background: 'rgba(37,99,235,0.08)' }}
                    onClick={() => navigate('/chat')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '14px 18px',
                      borderBottom: i < RECENT_CONVERSATIONS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      cursor: 'pointer', transition: 'background 0.2s',
                    }}
                  >
                    <div style={{ fontSize: 22, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(37,99,235,0.1)', borderRadius: 10 }}>{conv.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#F0F6FF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.title}</div>
                      <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.35)', marginTop: 2 }}>{conv.agent} · {conv.time}</div>
                    </div>
                    <span style={{ color: 'rgba(240,246,255,0.2)', fontSize: 16 }}>›</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'rgba(240,246,255,0.7)', marginBottom: 14, letterSpacing: 0.5 }}>RECOMMENDED FOR YOU</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {RECOMMENDATIONS.map((rec, i) => (
                  <motion.div
                    key={rec.title}
                    whileHover={{ y: -2 }}
                    className="glass-card"
                    style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => navigate('/chat', { state: { initialQuery: `Tell me about ${rec.title}` } })}
                  >
                    <div style={{ fontSize: 22 }}>{rec.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F6FF' }}>{rec.title}</div>
                      <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)', marginTop: 2 }}>{rec.desc}</div>
                    </div>
                    <div style={{
                      padding: '2px 8px', borderRadius: 12,
                      background: 'rgba(16,185,129,0.12)',
                      color: '#34D399', fontSize: 11, fontWeight: 600,
                      border: '1px solid rgba(16,185,129,0.2)', whiteSpace: 'nowrap',
                    }}>
                      {rec.match} match
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Languages */}
              <div className="glass-card" style={{ marginTop: 12, padding: '14px 16px' }}>
                <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', marginBottom: 10, fontWeight: 500 }}>🌐 AVAILABLE IN 22 LANGUAGES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {['English', 'हिंदी', 'मराठी', 'தமிழ்', 'తెలుగు', 'ಕನ್ನಡ', 'ગુજરાતી', 'বাংলা', 'ਪੰਜਾਬੀ', 'മലയാളം'].map(lang => (
                    <span key={lang} style={{
                      padding: '3px 8px', borderRadius: 6,
                      background: 'rgba(37,99,235,0.1)',
                      color: '#60A5FA', fontSize: 11,
                      border: '1px solid rgba(37,99,235,0.15)',
                    }}>{lang}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
