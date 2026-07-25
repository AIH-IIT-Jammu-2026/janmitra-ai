import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NeuralBackground from '../components/NeuralBackground'

const FEATURES = [
  { icon: '🤖', title: 'Multi-Agent AI', desc: '7 specialized AI agents work together to provide complete citizen assistance across all government domains', color: '#2563EB' },
  { icon: '🌐', title: '22 Languages', desc: 'Native support for Hindi, Marathi, Tamil, Telugu, Gujarati, Punjabi, Bengali, and 15 more Indian languages', color: '#8B5CF6' },
  { icon: '📄', title: 'Document AI', desc: 'Upload any government document for instant OCR, summarization, and eligibility matching with 96% accuracy', color: '#10B981' },
  { icon: '🎙️', title: 'Voice Interface', desc: 'Speak in your language. JanMitra AI understands speech and responds with voice-enabled guidance', color: '#F59E0B' },
  { icon: '🏛️', title: '100+ Schemes', desc: 'Comprehensive database of central and state government schemes with real-time eligibility checking', color: '#EF4444' },
  { icon: '⚡', title: 'Instant Answers', desc: 'RAG-powered knowledge retrieval ensures fast, accurate, and verified information from official sources', color: '#38BDF8' },
  { icon: '🔒', title: 'Privacy First', desc: 'End-to-end encryption. Your personal information is never shared or stored without consent', color: '#34D399' },
  { icon: '📱', title: 'Works Everywhere', desc: 'Web, mobile, WhatsApp, and offline mode for citizens with limited connectivity', color: '#A78BFA' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Ask in Any Language', desc: 'Type or speak your question in Hindi, English, Marathi, or any of 22 supported Indian languages', icon: '💬' },
  { step: '02', title: 'AI Routes to Expert', desc: 'The Intent Router Agent analyzes your query and activates the most relevant specialized AI agents', icon: '🔀' },
  { step: '03', title: 'Agents Collaborate', desc: 'Multiple agents work in parallel, retrieving verified information from our knowledge base', icon: '🤝' },
  { step: '04', title: 'Get Actionable Help', desc: 'Receive clear, personalized guidance with document requirements, links, and next steps', icon: '✅' },
]

const AGENTS = [
  { icon: '🏛️', name: 'Government Scheme Agent', desc: 'PM-KISAN, Ayushman Bharat, PMAY, 100+ schemes', color: '#2563EB' },
  { icon: '🩺', name: 'Healthcare Agent', desc: 'Symptom guidance, hospitals, health schemes', color: '#10B981' },
  { icon: '🎓', name: 'Education Agent', desc: 'Scholarships, career roadmaps, college info', color: '#8B5CF6' },
  { icon: '💼', name: 'Employment Agent', desc: 'Resume analysis, job matching, skill gaps', color: '#F59E0B' },
  { icon: '🌾', name: 'Agriculture Agent', desc: 'Mandi prices, crop advice, farming schemes', color: '#22C55E' },
  { icon: '⚖️', name: 'Legal Agent', desc: 'FIR guidance, consumer rights, document help', color: '#EF4444' },
  { icon: '🚨', name: 'Emergency Agent', desc: 'First aid, SOS, emergency contacts, hospitals', color: '#DC2626' },
]

const PROBLEM_STATS = [
  { stat: '₹1.5L Cr', desc: 'Government scheme benefits go unclaimed each year due to lack of awareness', icon: '💸' },
  { stat: '500+', desc: 'Government portals that citizens must navigate — each with different interfaces and language barriers', icon: '🌐' },
  { stat: '70%', desc: 'Rural citizens unable to access schemes they are entitled to due to complexity and language barriers', icon: '🚧' },
]

const FAQS = [
  { q: 'Is JanMitra AI free to use?', a: 'Yes, JanMitra AI is completely free for all citizens. It is built as a public service platform to democratize access to government information.' },
  { q: 'Which languages does it support?', a: 'JanMitra AI supports 22 Indian languages including Hindi, English, Marathi, Tamil, Telugu, Gujarati, Punjabi, Bengali, Malayalam, and more.' },
  { q: 'Is my data safe?', a: 'All data is encrypted end-to-end. We comply with India\'s data protection laws. Your personal information is never shared with third parties without consent.' },
  { q: 'Can it access real government portals?', a: 'JanMitra AI provides guidance and links to official portals. It does not submit applications on your behalf — it guides you through the process.' },
  { q: 'Does it work in rural areas with low internet?', a: 'We are building an offline mode and WhatsApp integration specifically for rural citizens with limited connectivity.' },
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
            height: 36,
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
        <a href="#how-it-works" style={{ color: 'rgba(240,246,255,0.7)', textDecoration: 'none', fontSize: 14 }}>
          How It Works
        </a>
        <a href="#architecture" style={{ color: 'rgba(240,246,255,0.7)', textDecoration: 'none', fontSize: 14 }}>
          Architecture
        </a>
        <a href="#faq" style={{ color: 'rgba(240,246,255,0.7)', textDecoration: 'none', fontSize: 14 }}>
          FAQ
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
          Try Demo
        </Link>
      </div>
    </motion.nav>
  )
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)

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
                  Powered by Multi-Agent AI · 22 Languages · 100+ Gov Schemes
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
              One AI.<br />
              <span style={{ color: '#60A5FA' }}>Every Citizen Service.</span><br />
              Anytime. In Any Language.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{
                fontSize: 18,
                color: 'rgba(240,246,255,0.65)',
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 640,
                margin: '0 auto 36px',
              }}
            >
              JanMitra AI helps citizens access government schemes, healthcare, education, employment, agriculture, legal assistance, and emergency services through one intelligent AI assistant.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 48 }}>
              <Link
                to="/chat"
                style={{
                  padding: '16px 36px',
                  background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                  borderRadius: 14,
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 700,
                  boxShadow: '0 0 30px rgba(37,99,235,0.5)',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
              >
                🚀 Try Demo Free
              </Link>
              <a
                href="#how-it-works"
                style={{
                  padding: '16px 36px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 14,
                  color: '#F0F6FF',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  border: '1px solid rgba(56,189,248,0.25)',
                }}
              >
                ▶ Watch Demo
              </a>
            </motion.div>

            {/* Agent Pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {AGENTS.map((agent) => (
                <Link
                  key={agent.name}
                  to="/chat"
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(11,36,71,0.6)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 20,
                    border: '1px solid rgba(56,189,248,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{agent.icon}</span>
                  <span style={{ fontSize: 13, color: 'rgba(240,246,255,0.8)', fontWeight: 500 }}>{agent.name.replace(' Agent', '')}</span>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── THE PROBLEM SECTION ─── */}
        <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
              The Problem
            </span>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
              Citizens Struggle to Access Their Rights
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {PROBLEM_STATS.map((item) => (
              <div key={item.stat} className="glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: '#EF4444', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(240,246,255,0.6)', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FEATURES SECTION ─── */}
        <section id="features" style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
              Features
            </span>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
              Built for Every Indian Citizen
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i }}
                className="glass-card"
                style={{ padding: '24px 18px' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}18`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 14 }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F0F6FF', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 12, color: 'rgba(240,246,255,0.55)', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── HOW IT WORKS SECTION ─── */}
        <section id="how-it-works" style={{ padding: '80px 40px', maxWidth: 950, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
              How It Works
            </span>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
              Simple. Intelligent. Instant.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, position: 'relative' }}>
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} style={{ textAlign: 'center', padding: '0 8px', position: 'relative' }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(37,99,235,0.15)',
                    border: '2px solid rgba(37,99,235,0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    margin: '0 auto 14px',
                    boxShadow: '0 0 20px rgba(37,99,235,0.2)',
                  }}
                >
                  {step.icon}
                </div>
                <div style={{ fontSize: 11, color: '#60A5FA', fontWeight: 700, marginBottom: 4 }}>{step.step}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF', marginBottom: 6 }}>{step.title}</h3>
                <p style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', lineHeight: 1.5 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── AI AGENTS SHOWCASE ─── */}
        <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
              AI Agents
            </span>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
              7 Expert AI Agents Working For You
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {AGENTS.map((agent) => (
              <Link
                key={agent.name}
                to="/chat"
                className="glass-card"
                style={{ padding: '20px', textDecoration: 'none', display: 'flex', gap: 14, alignItems: 'flex-start' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${agent.color}20`, border: `1px solid ${agent.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {agent.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF', marginBottom: 4 }}>{agent.name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', lineHeight: 1.5 }}>{agent.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── ARCHITECTURE SECTION ─── */}
        <section id="architecture" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>
              Architecture
            </span>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
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

        {/* ─── FAQ ACCORDION SECTION ─── */}
        <section id="faq" style={{ padding: '80px 40px', maxWidth: 750, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card" style={{ overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    background: 'none',
                    border: 'none',
                    color: '#F0F6FF',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 12,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 15,
                    fontWeight: 600,
                    textAlign: 'left',
                  }}
                >
                  {faq.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} style={{ color: '#60A5FA', flexShrink: 0, fontSize: 14 }}>
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ padding: '0 24px 20px', fontSize: 14, color: 'rgba(240,246,255,0.65)', lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
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
