import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NeuralBackground from '../components/NeuralBackground'

const FEATURES = [
  {
    icon: '🧠',
    title: 'AI Intent Router',
    desc: 'Routes user queries to the correct expert agents.',
    color: '#A78BFA',
  },
  {
    icon: '📑',
    title: 'Government Schemes',
    desc: 'Find relevant welfare schemes.',
    color: '#2563EB',
  },
  {
    icon: '🎓',
    title: 'Education Assistant',
    desc: 'Scholarships, admissions and student guidance.',
    color: '#8B5CF6',
  },
  {
    icon: '🌾',
    title: 'Agriculture Assistant',
    desc: 'Crop recommendations and subsidies.',
    color: '#10B981',
  },
  {
    icon: '🩺',
    title: 'Healthcare Assistant',
    desc: 'Health schemes and medical assistance.',
    color: '#EC4899',
  },
  {
    icon: '⚡',
    title: 'Multi-Agent Orchestration',
    desc: 'Multiple AI agents collaborate to generate one response.',
    color: '#38BDF8',
  },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '14px 40px',
        background: scrolled ? 'rgba(4,13,26,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(56,189,248,0.1)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 0.3s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 36,
            height: 38,
            background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            boxShadow: '0 0 16px rgba(37,99,235,0.5)',
          }}
        >
          🇮🇳
        </div>
        <span style={{ fontWeight: 800, fontSize: 18, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
          JanMitra AI
        </span>
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <a href="#features" style={{ color: 'rgba(240,246,255,0.7)', textDecoration: 'none', fontSize: 14 }}>
          Features
        </a>
        <a href="#architecture" style={{ color: 'rgba(240,246,255,0.7)', textDecoration: 'none', fontSize: 14 }}>
          Architecture
        </a>
        <Link
          to="/chat"
          style={{
            padding: '10px 22px',
            background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            borderRadius: 10,
            color: 'white',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 600,
            boxShadow: '0 0 16px rgba(37,99,235,0.4)',
          }}
        >
          Start Chat
        </Link>
      </div>
    </motion.nav>
  )
}

export default function LandingPage() {
  return (
    <div style={{ position: 'relative', background: 'linear-gradient(180deg, #040d1a 0%, #071A35 40%, #040d1a 100%)', minHeight: '100vh' }}>
      <NeuralBackground />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />

        {/* ─── HERO SECTION ─── */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 40px 60px', textAlign: 'center' }}>
          <div style={{ maxWidth: 850 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 16px',
                  borderRadius: 20,
                  background: 'rgba(37,99,235,0.12)',
                  border: '1px solid rgba(37,99,235,0.25)',
                  marginBottom: 24,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px #34D399' }} />
                <span style={{ fontSize: 13, color: '#60A5FA', fontWeight: 600 }}>
                  India's Multi-Agent Citizen Assistance Platform
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: 'clamp(40px, 6.5vw, 76px)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: 24,
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: -1,
                color: '#F0F6FF',
              }}
            >
              JanMitra AI
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#38BDF8',
                lineHeight: 1.5,
                marginBottom: 32,
                maxWidth: 700,
                margin: '0 auto 36px',
              }}
            >
              One AI Assistant.<br />
              Multiple Expert Agents.<br />
              Personalized Government Guidance.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <Link
                to="/chat"
                style={{
                  padding: '16px 36px',
                  background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                  borderRadius: 14,
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 17,
                  fontWeight: 700,
                  boxShadow: '0 0 30px rgba(37,99,235,0.5)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                Start Chat ➔
              </Link>
              <Link
                to="/architecture"
                style={{
                  padding: '16px 36px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 14,
                  color: '#F0F6FF',
                  textDecoration: 'none',
                  fontSize: 17,
                  fontWeight: 600,
                  border: '1px solid rgba(56,189,248,0.25)',
                }}
              >
                View Architecture
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURES SECTION ─── */}
        <section id="features" style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{ fontSize: 13, color: '#60A5FA', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
              Features
            </span>
            <h2 style={{ fontSize: 38, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
              Specialized Multi-Agent Ecosystem
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * i }}
                className="glass-card"
                style={{ padding: '28px 24px' }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, background: `${f.color}20`, border: `1px solid ${f.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#F0F6FF', marginBottom: 10, fontFamily: 'Space Grotesk, sans-serif' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(240,246,255,0.6)', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── ARCHITECTURE SECTION ─── */}
        <section id="architecture" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 13, color: '#60A5FA', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
              Architecture
            </span>
            <h2 style={{ fontSize: 38, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
              Real Multi-Agent Pipeline
            </h2>
          </div>

          <div className="glass-card" style={{ padding: 40 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              <ArchNode label="👤 User" sub="Citizen Input Query" color="#38BDF8" />
              <ArchArrow />
              <ArchNode label="🧠 Router Agent" sub="Intent Classification & Agent Dispatch" color="#A78BFA" />
              <ArchArrow />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, width: '100%', maxWidth: 720 }}>
                <ArchSubNode label="🎓 Education" color="#8B5CF6" />
                <ArchSubNode label="🌾 Agriculture" color="#10B981" />
                <ArchSubNode label="🩺 Health" color="#EC4899" />
                <ArchSubNode label="📑 Schemes" color="#2563EB" />
              </div>
              <ArchArrow />
              <ArchNode label="⚙️ Response Aggregator" sub="Multi-Agent Output Fusion & Priority Deduplication" color="#38BDF8" />
              <ArchArrow />
              <ArchNode label="🤖 Gemini" sub="LLM Context Generation" color="#FCD34D" />
              <ArchArrow />
              <ArchNode label="🗄️ RAG Engine" sub="Vector Similarity Index across 110+ Schemes" color="#34D399" />
              <ArchArrow />
              <ArchNode label="✅ Final Action Plan" sub="Personalized Citizen Action Items & Portal Links" color="#60A5FA" />
            </div>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ borderTop: '1px solid rgba(56,189,248,0.08)', padding: '36px 40px', textAlign: 'center', color: 'rgba(240,246,255,0.4)', fontSize: 13 }}>
          <p style={{ fontWeight: 600, color: '#F0F6FF', fontSize: 15, marginBottom: 4 }}>JanMitra AI</p>
          <p>India's Multi-Agent Citizen Assistance Platform · Powered by FastAPI, LangGraph & Gemini</p>
        </footer>
      </div>
    </div>
  )
}

function ArchNode({ label, sub, color }) {
  return (
    <div
      style={{
        padding: '14px 28px',
        background: `${color}15`,
        border: `1px solid ${color}35`,
        borderRadius: 14,
        textAlign: 'center',
        width: '100%',
        maxWidth: 420,
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 700, color: '#F0F6FF' }}>{label}</div>
      <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', marginTop: 4 }}>{sub}</div>
    </div>
  )
}

function ArchSubNode({ label, color }) {
  return (
    <div
      style={{
        padding: '12px 10px',
        background: `${color}15`,
        border: `1px solid ${color}35`,
        borderRadius: 12,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: 600,
        color: '#F0F6FF',
      }}
    >
      {label}
    </div>
  )
}

function ArchArrow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: 2, height: 18, background: '#38BDF8' }} />
      <div style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: '6px solid #38BDF8' }} />
    </div>
  )
}
