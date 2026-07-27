import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import NeuralBackground from '../components/NeuralBackground'
import Sidebar from '../components/layout/Sidebar'
import { useAssistant } from '../context/AssistantContext'

const QUICK_ACTIONS = [
  { icon: '🏛️', label: 'Government Schemes', desc: 'Find schemes you qualify for', color: '#2563EB', query: 'I am a farmer from Maharashtra. Which government schemes am I eligible for?', path: '/chat' },
  { icon: '📄', label: 'Verify Documents', desc: 'Instant OCR & eligibility match', color: '#10B981', path: '/documents' },
  { icon: '👩', label: 'Talk to Janvi', desc: 'Live Voice & Avatar Co-Pilot', color: '#06B6D4', isJanvi: true },
  { icon: '🎓', label: 'Study Assistant', desc: 'Scholarships & career roadmaps', color: '#8B5CF6', query: 'I am a student looking for scholarships and career guidance.', path: '/chat' },
  { icon: '🏥', label: 'Health Assistant', desc: 'Symptom guidance & hospital info', color: '#EC4899', query: 'What is Ayushman Bharat health insurance and Jan Aushadhi generic medicines?', path: '/chat' },
  { icon: '🌾', label: 'Agriculture', desc: 'Mandi prices & crop advice', color: '#22C55E', query: 'Show me current mandi prices and farming schemes in Maharashtra.', path: '/chat' },
  { icon: '🚨', label: 'Emergency Help', desc: 'Immediate SOS & first aid', color: '#DC2626', query: 'Emergency! I need immediate hospital and first aid guidance!', path: '/chat' },
  { icon: '💼', label: 'Employment', desc: 'Resume, jobs & skill matching', color: '#F59E0B', query: 'Please review my resume and suggest job opportunities and skill gaps.', path: '/chat' },
]

const STATS = [
  { value: '28', label: 'Conversations', icon: '💬', color: '#38BDF8' },
  { value: '6', label: 'Documents Verified', icon: '📄', color: '#34D399' },
  { value: '14', label: 'Eligible Schemes', icon: '🎯', color: '#A78BFA' },
  { value: '5', label: 'Applications Guided', icon: '📝', color: '#F59E0B' },
  { value: '3', label: 'Languages Used', icon: '🌐', color: '#EC4899' },
  { value: '19', label: 'AI Sessions', icon: '🤖', color: '#60A5FA' },
]

const CONTINUED_TASKS = [
  {
    id: 1,
    title: 'PM-KISAN Registration',
    category: 'Government Scheme',
    progress: 80,
    icon: '🌾',
    query: 'Continue my PM-KISAN registration application process',
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'LeetCode Binary Search & Algorithms',
    category: 'Education Hub',
    progress: 60,
    icon: '🎓',
    query: 'Explain Binary Search pattern and practice problems',
    status: 'Learning',
  },
]

const RECOMMENDATIONS = [
  { title: 'PM Internship Scheme', desc: '₹5,000/month stipend + top 500 company internship', match: '94%', icon: '🚀', query: 'Tell me about PM Internship Scheme eligibility' },
  { title: 'National Scholarship Portal (NSP)', desc: 'Post-Matric & Merit scholarships for students', match: '91%', icon: '🎓', query: 'Show me National Scholarship Portal NSP schemes' },
  { title: 'Ayushman Bharat PM-JAY', desc: '₹5 Lakh free health insurance cover for family', match: '88%', icon: '🩺', query: 'How to apply for Ayushman Bharat Golden Card' },
  { title: 'PMAY Urban Housing Subsidy', desc: 'Interest subsidy on home loans for first-time buyers', match: '84%', icon: '🏠', query: 'PMAY Housing loan subsidy details' },
]

const GOVT_UPDATES = [
  { title: 'New NSP Scholarship Deadline Extended', date: 'July 26, 2026', tag: 'Education', priority: 'Urgent' },
  { title: 'PM-KISAN 17th Installment Released', date: 'July 24, 2026', tag: 'Agriculture', priority: 'Info' },
  { title: 'Ayushman Bharat Card Portal Upgraded', date: 'July 22, 2026', tag: 'Healthcare', priority: 'New' },
]

const CITIZEN_TIMELINE = [
  { date: 'July 20, 2026', title: 'Verified Income Certificate', desc: 'Gemini Vision AI parsed Aadhaar & Income Certificate with 98% accuracy.', status: 'Completed', icon: '📄' },
  { date: 'July 21, 2026', title: 'Matched 4 Eligible Schemes', desc: 'Identified PM-KISAN, Ayushman Bharat, PMAY, and NSP Scholarship eligibility.', status: 'Completed', icon: '🎯' },
  { date: 'July 22, 2026', title: 'Downloaded Custom Action Plan PDF', desc: 'Generated step-by-step document checklist and portal direct links.', status: 'Completed', icon: '📑' },
  { date: 'July 23, 2026', title: 'Visited CSC Center / Official Portal', desc: 'Submitted document verification numbers to official portal.', status: 'Completed', icon: '🏛️' },
  { date: 'July 24, 2026', title: 'PM-KISAN Application Submitted', desc: 'Application Ref #PMK-2026-8891 registered on state portal.', status: 'In Review', icon: '📝' },
  { date: 'July 25, 2026', title: 'Application Status Updated', desc: 'Passed Tehsil verification step. Pending final DBT disbursement.', status: 'Active', icon: '⏳' },
]

const ACHIEVEMENTS = [
  { title: 'First Document Verified', icon: '📄', unlocked: true, desc: 'Uploaded Aadhaar or Income cert' },
  { title: 'First Scheme Found', icon: '🎯', unlocked: true, desc: 'Matched eligible government scheme' },
  { title: 'Completed First Application', icon: '📝', unlocked: true, desc: 'Guided through full application' },
  { title: 'Used 5 Languages', icon: '🌐', unlocked: true, desc: 'Interacted in multiple Indian languages' },
  { title: '100 AI Conversations', icon: '💯', unlocked: true, desc: 'Reached 100+ AI assistant turns' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  let openAssistant = () => {}
  try {
    const ctx = useAssistant()
    if (ctx?.openAssistant) openAssistant = ctx.openAssistant
  } catch (err) {
    // fallback if assistant context is not available
  }
  const [userName, setUserName] = useState(() => localStorage.getItem('janmitra_user_name') || 'Tanushri')
  const [activeTab, setActiveTab] = useState('overview') // 'overview' | 'timeline' | 'profile' | 'downloads'
  const [greeting, setGreeting] = useState('Good Morning')
  const [goalChecklist, setGoalChecklist] = useState([
    { id: 1, text: 'Find eligible government schemes', done: true },
    { id: 2, text: 'Complete pending PM-KISAN application', done: false },
    { id: 3, text: 'Continue education & skill session', done: false },
  ])

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('Good Morning')
    else if (h < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  const toggleGoal = (id) => {
    setGoalChecklist((prev) => prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g)))
  }

  const handleActionClick = (action) => {
    if (action.isJanvi) {
      openAssistant()
    } else if (action.path === '/documents') {
      navigate('/documents')
    } else if (action.query) {
      navigate('/chat', { state: { initialQuery: action.query } })
    } else {
      navigate('/chat')
    }
  }

  return (
    <div className="app-layout" style={{ display: 'flex', minHeight: '100vh', background: '#040d1a' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, position: 'relative', minHeight: '100vh', overflowY: 'auto' }}>
        <NeuralBackground />

        <div style={{ position: 'relative', zIndex: 2, padding: '28px 32px 60px', maxWidth: 1280, margin: '0 auto' }}>
          
          {/* Top Header & Navigation Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 13, color: '#38BDF8', fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>
                🏠 Citizen Digital Portal
              </div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
                My Dashboard
              </h1>
            </div>

            {/* Tab Bar */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                background: 'rgba(11,36,71,0.6)',
                padding: 4,
                borderRadius: 14,
                border: '1px solid rgba(56,189,248,0.2)',
              }}
            >
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'timeline', label: 'Citizen Timeline ⭐', icon: '⏳' },
                { id: 'profile', label: 'My Profile 👤', icon: '👤' },
                { id: 'downloads', label: 'Downloads 📁', icon: '📥' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 10,
                    border: 'none',
                    background: activeTab === tab.id ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'rgba(240,246,255,0.65)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ─── TAB CONTENT 1: OVERVIEW ─── */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              
              {/* 👋 Welcome Card */}
              <div
                className="glass-card"
                style={{
                  padding: '24px 28px',
                  marginBottom: 28,
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, rgba(11,36,71,0.8), rgba(7,26,53,0.9))',
                  border: '1px solid rgba(56,189,248,0.25)',
                  display: 'grid',
                  gridTemplateColumns: '1.4fr 1fr',
                  gap: 24,
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontSize: 13, color: '#60A5FA', fontWeight: 600, marginBottom: 4 }}>
                    {greeting}, {userName} 👋
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>
                    Welcome back to JanMitra AI
                  </h2>
                  <p style={{ fontSize: 14, color: 'rgba(240,246,255,0.7)', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "Your AI citizen assistant is ready."
                  </p>
                  <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                    <button
                      onClick={() => navigate('/chat')}
                      style={{
                        padding: '10px 20px',
                        background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                        borderRadius: 10,
                        color: 'white',
                        border: 'none',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 0 16px rgba(37,99,235,0.4)',
                      }}
                    >
                      💬 Start New Conversation
                    </button>
                    <button
                      onClick={openAssistant}
                      style={{
                        padding: '10px 20px',
                        background: 'rgba(6,182,212,0.15)',
                        border: '1px solid rgba(6,182,212,0.4)',
                        borderRadius: 10,
                        color: '#67E8F9',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      👩 Talk to Janvi
                    </button>
                  </div>
                </div>

                {/* Today's Goal Checklist */}
                <div
                  style={{
                    background: 'rgba(4,13,26,0.6)',
                    padding: '18px 20px',
                    borderRadius: 14,
                    border: '1px solid rgba(56,189,248,0.15)',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#38BDF8', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>🎯</span> Today's Goal
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {goalChecklist.map((goal) => (
                      <div
                        key={goal.id}
                        onClick={() => toggleGoal(goal.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          fontSize: 13,
                          color: goal.done ? '#34D399' : 'rgba(240,246,255,0.85)',
                          cursor: 'pointer',
                          textDecoration: goal.done ? 'line-through' : 'none',
                        }}
                      >
                        <span style={{ fontSize: 14, fontWeight: 'bold' }}>{goal.done ? '✓' : '○'}</span>
                        <span>{goal.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 📊 Quick Stats (6 Cards) */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
                  📊 Quick Stats
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
                  {STATS.map((s) => (
                    <motion.div key={s.label} whileHover={{ y: -3 }} className="glass-card" style={{ padding: '16px 14px', textAlign: 'center' }}>
                      <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color, fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</div>
                      <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)', marginTop: 2, fontWeight: 500 }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ⚡ Quick Actions (Large Cards) */}
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
                  ⚡ Quick Actions
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                  {QUICK_ACTIONS.map((action, i) => (
                    <motion.div
                      key={action.label}
                      whileHover={{ y: -4, borderColor: action.color }}
                      whileTap={{ scale: 0.98 }}
                      className="glass-card"
                      onClick={() => handleActionClick(action)}
                      style={{
                        padding: '20px 18px',
                        cursor: 'pointer',
                        border: `1px solid ${action.color}30`,
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `${action.color}20`,
                        border: `1px solid ${action.color}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22, marginBottom: 12,
                      }}>
                        {action.icon}
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#F0F6FF', marginBottom: 4 }}>{action.label}</div>
                      <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', lineHeight: 1.4 }}>{action.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* 📌 Continue Where You Left Off & Recommended Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, marginBottom: 32 }}>
                
                {/* Continue Tasks */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
                    📌 Continue Where You Left Off
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {CONTINUED_TASKS.map((task) => (
                      <div key={task.id} className="glass-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ fontSize: 28, width: 44, height: 44, borderRadius: 12, background: 'rgba(37,99,235,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {task.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: '#F0F6FF' }}>{task.title}</div>
                          <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', marginBottom: 8 }}>{task.category}</div>
                          
                          {/* Progress Bar */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ flex: 1, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                              <div style={{ width: `${task.progress}%`, height: '100%', background: 'linear-gradient(90deg, #2563EB, #38BDF8)' }} />
                            </div>
                            <span style={{ fontSize: 12, color: '#38BDF8', fontWeight: 700 }}>{task.progress}%</span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate('/chat', { state: { initialQuery: task.query } })}
                          style={{
                            padding: '8px 16px',
                            background: 'rgba(37,99,235,0.2)',
                            border: '1px solid rgba(37,99,235,0.4)',
                            borderRadius: 10,
                            color: '#60A5FA',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          Continue →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ⭐ Recommended For You */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
                    ⭐ Recommended For You
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {RECOMMENDATIONS.map((rec) => (
                      <div
                        key={rec.title}
                        className="glass-card"
                        onClick={() => navigate('/chat', { state: { initialQuery: rec.query } })}
                        style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
                      >
                        <div style={{ fontSize: 22 }}>{rec.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F6FF' }}>{rec.title}</div>
                          <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)' }}>{rec.desc}</div>
                        </div>
                        <span style={{ fontSize: 11, color: '#34D399', fontWeight: 700, padding: '2px 8px', borderRadius: 10, background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)' }}>
                          {rec.match}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 📰 Government Updates & Announcements */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#60A5FA', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 14 }}>
                  📰 Official Government Updates & Deadlines
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                  {GOVT_UPDATES.map((upd) => (
                    <div key={upd.title} className="glass-card" style={{ padding: '16px 18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: '#38BDF8', fontWeight: 600, padding: '2px 8px', borderRadius: 8, background: 'rgba(56,189,248,0.12)' }}>{upd.tag}</span>
                        <span style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)' }}>{upd.date}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F6FF', lineHeight: 1.4 }}>{upd.title}</div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          )}

          {/* ─── TAB CONTENT 2: CITIZEN TIMELINE ⭐ ─── */}
          {activeTab === 'timeline' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="glass-card" style={{ padding: '28px 32px', borderRadius: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <div>
                    <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
                      ⭐ My Citizen Journey Timeline
                    </h2>
                    <p style={{ fontSize: 13, color: 'rgba(240,246,255,0.6)', marginTop: 4 }}>
                      Track your end-to-end progress from initial document check to scheme application & disbursements.
                    </p>
                  </div>
                  <div style={{ padding: '6px 14px', background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: 20, fontSize: 12, color: '#60A5FA', fontWeight: 600 }}>
                    Ref ID: #CZ-2026-9902
                  </div>
                </div>

                {/* Timeline Visual Steps */}
                <div style={{ position: 'relative', paddingLeft: 30, borderLeft: '2px dashed rgba(56,189,248,0.3)', display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {CITIZEN_TIMELINE.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      style={{ position: 'relative' }}
                    >
                      {/* Timeline Dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: -41,
                          top: 2,
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: item.status === 'Completed' ? '#34D399' : '#38BDF8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          color: '#040d1a',
                          fontWeight: 'bold',
                          boxShadow: `0 0 10px ${item.status === 'Completed' ? '#34D399' : '#38BDF8'}`,
                        }}
                      >
                        {item.status === 'Completed' ? '✓' : '•'}
                      </div>

                      <div
                        style={{
                          background: 'rgba(11,36,71,0.5)',
                          border: '1px solid rgba(56,189,248,0.18)',
                          borderRadius: 14,
                          padding: '16px 20px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <span style={{ fontSize: 12, color: '#38BDF8', fontWeight: 600 }}>{item.date}</span>
                          <span
                            style={{
                              fontSize: 11,
                              padding: '2px 8px',
                              borderRadius: 10,
                              background: item.status === 'Completed' ? 'rgba(16,185,129,0.15)' : 'rgba(37,99,235,0.2)',
                              color: item.status === 'Completed' ? '#34D399' : '#60A5FA',
                              fontWeight: 600,
                            }}
                          >
                            {item.status}
                          </span>
                        </div>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F0F6FF', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{item.icon}</span> {item.title}
                        </h3>
                        <p style={{ fontSize: 13, color: 'rgba(240,246,255,0.65)', lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── TAB CONTENT 3: MY PROFILE 👤 ─── */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                
                {/* Personal Information */}
                <div className="glass-card" style={{ padding: '24px 28px', borderRadius: 18 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F0F6FF', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>👤</span> Personal Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13 }}>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Full Name:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>{userName}</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Age:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>24 Years</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Gender:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>Female</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>State:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>Maharashtra</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>District:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>Pune</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Preferred Language:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>Hindi / English</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Occupation:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>Student & Farmer</div></div>
                  </div>
                </div>

                {/* Government Profile (Eligibility Determinants) */}
                <div className="glass-card" style={{ padding: '24px 28px', borderRadius: 18 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F0F6FF', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>🏛️</span> Government Profile (Eligibility Rules)
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: 13 }}>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Category:</span> <div style={{ color: '#60A5FA', fontWeight: 600 }}>OBC / General</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Annual Income:</span> <div style={{ color: '#34D399', fontWeight: 600 }}>&lt; ₹2,50,000</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Farmer Holding:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>Small (&lt; 2 Hectares)</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Student Status:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>Enrolled Undergraduate</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Employment:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>Job Seeking</div></div>
                    <div><span style={{ color: 'rgba(240,246,255,0.45)' }}>Disability Status:</span> <div style={{ color: '#F0F6FF', fontWeight: 600 }}>None</div></div>
                  </div>
                </div>

                {/* Uploaded Verified Documents */}
                <div className="glass-card" style={{ padding: '24px 28px', borderRadius: 18, gridColumn: 'span 2' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F0F6FF', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>📁</span> Uploaded & Verified Documents
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
                    {[
                      { name: 'Aadhaar Card', status: 'Verified', date: 'Uploaded July 20' },
                      { name: 'Income Certificate', status: 'Verified', date: 'Uploaded July 20' },
                      { name: 'Farmer Land Record', status: 'Pending Verification', date: 'Uploaded July 24' },
                      { name: 'Ration Card', status: 'Verified', date: 'Uploaded July 20' },
                    ].map((doc) => (
                      <div key={doc.name} style={{ background: 'rgba(4,13,26,0.6)', padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(56,189,248,0.15)' }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F6FF', marginBottom: 4 }}>{doc.name}</div>
                        <div style={{ fontSize: 11, color: doc.status === 'Verified' ? '#34D399' : '#F59E0B', fontWeight: 600 }}>
                          {doc.status === 'Verified' ? '✅ Verified' : '⏳ Pending'}
                        </div>
                        <div style={{ fontSize: 10, color: 'rgba(240,246,255,0.4)', marginTop: 4 }}>{doc.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ─── TAB CONTENT 4: DOWNLOADS 📁 ─── */}
          {activeTab === 'downloads' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className="glass-card" style={{ padding: '28px 32px', borderRadius: 20 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 20 }}>
                  📥 Download Center & Saved Reports
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {[
                    { title: 'JanMitra Scheme Eligibility Report (PDF)', size: '1.2 MB', icon: '📊' },
                    { title: 'PM-KISAN Step-by-Step Action Plan (PDF)', size: '850 KB', icon: '📑' },
                    { title: 'Government Document Verification Checklist', size: '420 KB', icon: '✅' },
                    { title: 'AI Spoken Guidance Session Transcript', size: '610 KB', icon: '💬' },
                    { title: 'Ayushman Bharat Hospital Portal Direct Guide', size: '940 KB', icon: '🏥' },
                  ].map((dl) => (
                    <div key={dl.title} style={{ background: 'rgba(11,36,71,0.5)', border: '1px solid rgba(56,189,248,0.2)', padding: '18px 20px', borderRadius: 14 }}>
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{dl.icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#F0F6FF', marginBottom: 4 }}>{dl.title}</div>
                      <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)', marginBottom: 14 }}>{dl.size} · Saved to Account</div>
                      <button
                        onClick={() => alert(`Downloading ${dl.title}...`)}
                        style={{
                          padding: '6px 14px',
                          background: 'rgba(37,99,235,0.2)',
                          border: '1px solid rgba(37,99,235,0.4)',
                          borderRadius: 8,
                          color: '#60A5FA',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        ⬇️ Download File
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* 🎯 AI Journey & 🏆 Achievements Showcase (Bottom Banner) */}
          <div style={{ marginTop: 36, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            
            {/* AI Journey */}
            <div className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
                🎯 My AI Journey
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
                JanMitra AI helped you <span style={{ color: '#34D399' }}>24 times</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, textAlign: 'center' }}>
                <div style={{ background: 'rgba(37,99,235,0.12)', padding: '10px', borderRadius: 10 }}><div style={{ fontSize: 16, fontWeight: 700, color: '#60A5FA' }}>12</div><div style={{ fontSize: 10, color: 'rgba(240,246,255,0.5)' }}>Gov Schemes</div></div>
                <div style={{ background: 'rgba(139,92,246,0.12)', padding: '10px', borderRadius: 10 }}><div style={{ fontSize: 16, fontWeight: 700, color: '#A78BFA' }}>8</div><div style={{ fontSize: 10, color: 'rgba(240,246,255,0.5)' }}>Education</div></div>
                <div style={{ background: 'rgba(236,72,153,0.12)', padding: '10px', borderRadius: 10 }}><div style={{ fontSize: 16, fontWeight: 700, color: '#F472B6' }}>3</div><div style={{ fontSize: 10, color: 'rgba(240,246,255,0.5)' }}>Healthcare</div></div>
                <div style={{ background: 'rgba(239,68,68,0.12)', padding: '10px', borderRadius: 10 }}><div style={{ fontSize: 16, fontWeight: 700, color: '#F87171' }}>1</div><div style={{ fontSize: 10, color: 'rgba(240,246,255,0.5)' }}>Emergency</div></div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
                🏆 Achievements & Badges
              </div>
              <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
                {ACHIEVEMENTS.map((ach) => (
                  <div key={ach.title} style={{ background: 'rgba(4,13,26,0.6)', border: '1px solid rgba(245,158,11,0.3)', padding: '8px 12px', borderRadius: 10, minWidth: 120, textAlign: 'center' }}>
                    <div style={{ fontSize: 20 }}>{ach.icon}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#F0F6FF', marginTop: 4 }}>{ach.title}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
