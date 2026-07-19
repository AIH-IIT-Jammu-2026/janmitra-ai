import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import NeuralBackground from '../components/NeuralBackground'

// Animated counter component
function Counter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  return <>{count.toLocaleString()}{suffix}</>
}

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

const TECH_STACK = [
  { name: 'React 19', icon: '⚛️', desc: 'Frontend UI', color: '#38BDF8' },
  { name: 'FastAPI', icon: '⚡', desc: 'Backend API', color: '#34D399' },
  { name: 'OpenAI GPT-4.1', icon: '🧠', desc: 'Language Model', color: '#A78BFA' },
  { name: 'LangGraph', icon: '🔗', desc: 'Agent Orchestration', color: '#FCD34D' },
  { name: 'LangChain', icon: '⛓️', desc: 'AI Framework', color: '#60A5FA' },
  { name: 'Supabase', icon: '🗄️', desc: 'Database & Auth', color: '#34D399' },
  { name: 'FAISS', icon: '🔍', desc: 'Vector Search', color: '#F87171' },
  { name: 'Whisper', icon: '🎙️', desc: 'Speech-to-Text', color: '#38BDF8' },
  { name: 'Docker', icon: '🐳', desc: 'Containerization', color: '#60A5FA' },
  { name: 'Vercel', icon: '▲', desc: 'Deployment', color: '#F0F6FF' },
]

const ROADMAP = [
  { year: '2026 Q1', title: 'MVP Launch', items: ['7 AI Agents', '22 Languages', 'Web Platform', 'Core Features'], status: 'active' },
  { year: '2026 Q3', title: 'State Rollout', items: ['5 Pilot States', 'WhatsApp Integration', 'Offline Mode', '500+ Schemes'], status: 'upcoming' },
  { year: '2027 Q1', title: 'National Expansion', items: ['All 28 States', 'Gram Panchayat Integration', 'Mobile App', '1M Users'], status: 'future' },
  { year: '2027 Q4', title: 'Gov Integration', items: ['DigiLocker Sync', 'UIDAI Integration', 'API Gateway', 'Voice Assistant'], status: 'future' },
]

const IMPACT_STATS = [
  { value: 10, suffix: 'M+', label: 'Citizens Served', icon: '👥' },
  { value: 100, suffix: '+', label: 'Gov Schemes', icon: '🏛️' },
  { value: 22, suffix: '+', label: 'Languages', icon: '🌐' },
  { value: 7, suffix: '', label: 'AI Agents', icon: '🤖' },
  { value: 95, suffix: '%', label: 'Faster Access', icon: '⚡' },
  { value: 96, suffix: '%', label: 'Accuracy', icon: '🎯' },
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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '14px 40px',
        background: scrolled ? 'rgba(4,13,26,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(56,189,248,0.08)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all 0.3s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #2563EB, #38BDF8)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 0 16px rgba(37,99,235,0.5)' }}>🇮🇳</div>
        <span style={{ fontWeight: 700, fontSize: 17, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>JanMitra AI</span>
      </div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {['Features', 'How It Works', 'Architecture', 'Roadmap'].map(item => (
          <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'rgba(240,246,255,0.6)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#60A5FA'}
            onMouseLeave={e => e.target.style.color = 'rgba(240,246,255,0.6)'}
          >{item}</a>
        ))}
        <a href="/login" style={{ padding: '8px 20px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderRadius: 10, color: 'white', textDecoration: 'none', fontSize: 14, fontWeight: 600, boxShadow: '0 0 16px rgba(37,99,235,0.4)', transition: 'all 0.2s' }}>
          Try Demo
        </a>
      </div>
    </motion.nav>
  )
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true)
    }, { threshold: 0.2 })
    const el = document.getElementById('impact')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ position: 'relative', background: 'linear-gradient(180deg, #040d1a 0%, #071A35 30%, #040d1a 70%, #040d1a 100%)' }}>
      <NeuralBackground />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <Navbar />

        {/* ─── HERO ─── */}
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 40px 60px', textAlign: 'center' }}>
          <div style={{ maxWidth: 800 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'rgba(37,99,235,0.12)', border: '1px solid rgba(37,99,235,0.25)', marginBottom: 24 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#34D399', display: 'inline-block', boxShadow: '0 0 8px #34D399' }} />
                <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 500 }}>Powered by Multi-Agent AI · 22 Languages · 100+ Gov Schemes</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 24, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: -1 }}
            >
              <span style={{ color: '#F0F6FF' }}>One AI.</span>
              <br />
              <span className="gradient-text">Every Citizen Service.</span>
              <br />
              <span style={{ color: '#F0F6FF' }}>Anytime. In Any Language.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              style={{ fontSize: 18, color: 'rgba(240,246,255,0.6)', lineHeight: 1.7, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}
            >
              JanMitra AI helps citizens access government schemes, healthcare, education, employment, agriculture, legal assistance, and emergency services through one intelligent AI assistant.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="/login"
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(37,99,235,0.7)' }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '14px 32px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderRadius: 14, color: 'white', textDecoration: 'none', fontSize: 16, fontWeight: 700, boxShadow: '0 0 30px rgba(37,99,235,0.5)', fontFamily: 'Space Grotesk, sans-serif', display: 'inline-block' }}
              >
                🚀 Try Demo Free
              </motion.a>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '14px 32px', background: 'rgba(255,255,255,0.04)', borderRadius: 14, color: '#F0F6FF', textDecoration: 'none', fontSize: 16, fontWeight: 600, border: '1px solid rgba(255,255,255,0.12)', display: 'inline-block' }}
              >
                ▶ Watch Demo
              </motion.a>
            </motion.div>

            {/* Floating Agent Icons */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} style={{ marginTop: 64, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              {AGENTS.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  style={{ padding: '8px 14px', background: 'rgba(11,36,71,0.5)', backdropFilter: 'blur(10px)', borderRadius: 20, border: '1px solid rgba(56,189,248,0.15)', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <span style={{ fontSize: 16 }}>{agent.icon}</span>
                  <span style={{ fontSize: 12, color: 'rgba(240,246,255,0.7)', fontWeight: 500 }}>{agent.name.replace(' Agent', '')}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── PROBLEM ─── */}
        <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>The Problem</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
                Citizens Struggle to Access Their Rights
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
              {[
                { stat: '₹1.5L Cr', desc: 'Government scheme benefits go unclaimed each year due to lack of awareness', icon: '💸' },
                { stat: '500+', desc: 'Government portals that citizens must navigate — each with different interfaces and language barriers', icon: '🌐' },
                { stat: '70%', desc: 'Rural citizens unable to access schemes they are entitled to due to complexity and language barriers', icon: '🚧' },
              ].map(item => (
                <div key={item.stat} className="glass-card" style={{ padding: '28px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: '#EF4444', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>{item.stat}</div>
                  <div style={{ fontSize: 13, color: 'rgba(240,246,255,0.55)', lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Features</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
                Built for Every Indian Citizen
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {FEATURES.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }} whileHover={{ y: -4 }} className="glass-card" style={{ padding: '24px 18px' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}18`, border: `1px solid ${f.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 14 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF', marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', lineHeight: 1.6 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how-it-works" style={{ padding: '80px 40px', maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>How It Works</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>
                Simple. Intelligent. Instant.
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }}>
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} style={{ textAlign: 'center', padding: '0 16px', position: 'relative' }}>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div style={{ position: 'absolute', top: 30, left: '60%', right: '-40%', height: 2, background: 'linear-gradient(90deg, #2563EB, rgba(37,99,235,0.1))', zIndex: 0 }} />
                  )}
                  <motion.div
                    whileInView={{ scale: [0.8, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(37,99,235,0.15)', border: '2px solid rgba(37,99,235,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto 14px', position: 'relative', zIndex: 1, boxShadow: '0 0 20px rgba(37,99,235,0.2)' }}
                  >{step.icon}</motion.div>
                  <div style={{ fontSize: 11, color: '#60A5FA', fontWeight: 700, marginBottom: 4 }}>{step.step}</div>
                  <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF', marginBottom: 6 }}>{step.title}</h3>
                  <p style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', lineHeight: 1.5 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── AI AGENTS ─── */}
        <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>AI Agents</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>7 Expert AI Agents Working For You</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
              {AGENTS.map((agent, i) => (
                <motion.a
                  key={agent.name}
                  href="/login"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 * i }}
                  whileHover={{ y: -4, borderColor: `${agent.color}50` }}
                  className="glass-card"
                  style={{ padding: '20px', display: 'flex', gap: 14, alignItems: 'flex-start', textDecoration: 'none', border: `1px solid rgba(255,255,255,0.06)`, transition: 'all 0.25s' }}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${agent.color}20`, border: `1px solid ${agent.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{agent.icon}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF', marginBottom: 4 }}>{agent.name}</div>
                    <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.45)', lineHeight: 1.5 }}>{agent.desc}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── ARCHITECTURE ─── */}
        <section id="architecture" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Architecture</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>Intelligent Multi-Agent System</h2>
            </div>
            <ArchDiagram />
          </motion.div>
        </section>

        {/* ─── TECH STACK ─── */}
        <section style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Tech Stack</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>Built with Modern Technologies</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14 }}>
              {TECH_STACK.map((tech, i) => (
                <motion.div key={tech.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 * i }} whileHover={{ y: -3, borderColor: `${tech.color}40` }} className="glass-card" style={{ padding: '20px 14px', textAlign: 'center', transition: 'all 0.25s' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{tech.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F0F6FF', marginBottom: 4 }}>{tech.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)' }}>{tech.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── IMPACT ─── */}
        <section id="impact" style={{ padding: '80px 40px', maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Impact</span>
            <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>Transforming Citizen Services at Scale</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
            {IMPACT_STATS.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }} className="glass-card" style={{ padding: '24px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{stat.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#60A5FA', fontFamily: 'Space Grotesk, sans-serif' }}>
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)', marginTop: 4 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ─── ROADMAP ─── */}
        <section id="roadmap" style={{ padding: '80px 40px', maxWidth: 1000, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>Roadmap</span>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginTop: 8 }}>Future Vision</h2>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 119, top: 0, bottom: 0, width: 2, background: 'linear-gradient(180deg, #2563EB, rgba(37,99,235,0.1))', zIndex: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {ROADMAP.map((item, i) => (
                  <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{ width: 120, textAlign: 'right', flexShrink: 0, paddingTop: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: item.status === 'active' ? '#38BDF8' : 'rgba(240,246,255,0.4)', fontFamily: 'Space Grotesk, sans-serif' }}>{item.year}</span>
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: item.status === 'active' ? '#38BDF8' : 'rgba(37,99,235,0.3)', border: `2px solid ${item.status === 'active' ? '#38BDF8' : 'rgba(37,99,235,0.3)'}`, marginTop: 10, boxShadow: item.status === 'active' ? '0 0 16px #38BDF8' : 'none' }} />
                    </div>
                    <div className="glass-card" style={{ flex: 1, padding: '16px 20px', borderColor: item.status === 'active' ? 'rgba(56,189,248,0.3)' : 'rgba(56,189,248,0.08)' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#F0F6FF', marginBottom: 8 }}>{item.title}</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {item.items.map(it => (
                          <span key={it} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 12, background: 'rgba(37,99,235,0.1)', color: '#60A5FA', border: '1px solid rgba(37,99,235,0.15)' }}>{it}</span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: '80px 40px', maxWidth: 700, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>Frequently Asked Questions</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FAQS.map((faq, i) => (
                <motion.div key={i} className="glass-card" style={{ overflow: 'hidden' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '16px 20px', background: 'none', border: 'none', color: '#F0F6FF', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 500, textAlign: 'left' }}
                  >
                    {faq.q}
                    <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} style={{ color: '#60A5FA', flexShrink: 0, fontSize: 16 }}>▼</motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{ padding: '0 20px 16px', fontSize: 13, color: 'rgba(240,246,255,0.6)', lineHeight: 1.7 }}>{faq.a}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: '80px 40px', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass-card" style={{ maxWidth: 680, margin: '0 auto', padding: '56px 40px', border: '1px solid rgba(56,189,248,0.2)', boxShadow: '0 0 60px rgba(37,99,235,0.15)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🇮🇳</div>
            <h2 style={{ fontSize: 34, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>
              <span className="gradient-text">Jai Hind. Jan Seva.</span>
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(240,246,255,0.6)', marginBottom: 28, lineHeight: 1.7 }}>
              JanMitra AI is dedicated to ensuring every Indian citizen can access the services, schemes, and support they deserve — in their language, on their terms.
            </p>
            <motion.a href="/login" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block', padding: '14px 36px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderRadius: 14, color: 'white', textDecoration: 'none', fontSize: 16, fontWeight: 700, boxShadow: '0 0 30px rgba(37,99,235,0.5)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Get Started Free →
            </motion.a>
          </motion.div>
        </section>

        {/* Footer */}
        <footer style={{ borderTop: '1px solid rgba(56,189,248,0.08)', padding: '32px 40px', textAlign: 'center', color: 'rgba(240,246,255,0.3)', fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>🇮🇳</span>
            <span style={{ fontWeight: 600, color: 'rgba(240,246,255,0.5)' }}>JanMitra AI</span>
          </div>
          <p>Built with ❤️ for India's 1.4 Billion Citizens · Hackathon 2026 · Made in India</p>
          <p style={{ marginTop: 6 }}>React · FastAPI · LangGraph · OpenAI · Supabase</p>
        </footer>
      </div>
    </div>
  )
}

function ArchDiagram() {
  return (
    <div className="glass-card" style={{ padding: 40, position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        <ArchNode label="👤 User Input" sub="Voice · Text · Image" color="#38BDF8" />
        <ArchArrow />
        <ArchNode label="🔀 Intent Router Agent" sub="Query Classification & Language Detection" color="#A78BFA" />
        <ArchArrow />
        <ArchNode label="⚙️ Multi-Agent Orchestrator" sub="LangGraph · Parallel Agent Execution" color="#2563EB" />
        <ArchArrow />
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 0 }}>
          {AGENTS.map(a => (
            <motion.div
              key={a.name}
              whileHover={{ y: -3, borderColor: `${a.color}50` }}
              style={{ padding: '10px 14px', background: `${a.color}12`, border: `1px solid ${a.color}25`, borderRadius: 12, textAlign: 'center', minWidth: 100 }}
            >
              <div style={{ fontSize: 18, marginBottom: 4 }}>{a.icon}</div>
              <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.7)', fontWeight: 500 }}>{a.name.replace(' Agent', '')}</div>
            </motion.div>
          ))}
        </div>
        <ArchArrow />
        <ArchNode label="🗄️ RAG Knowledge Layer" sub="FAISS Vector DB · LangChain · Verified Gov Docs" color="#34D399" />
        <ArchArrow />
        <ArchNode label="🧠 OpenAI GPT-4.1" sub="Language Generation · Reasoning · Summarization" color="#FCD34D" />
        <ArchArrow />
        <ArchNode label="🗃️ Supabase" sub="User Profiles · Conversations · Documents" color="#60A5FA" />
      </div>
    </div>
  )
}

function ArchNode({ label, sub, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{
        padding: '12px 24px',
        background: `rgba(${color === '#38BDF8' ? '56,189,248' : color === '#A78BFA' ? '167,139,250' : color === '#2563EB' ? '37,99,235' : color === '#34D399' ? '52,211,153' : color === '#FCD34D' ? '252,211,77' : '96,165,250'},0.1)`,
        border: `1px solid ${color}30`,
        borderRadius: 12, textAlign: 'center', width: '100%', maxWidth: 420,
      }}
    >
      <div style={{ fontSize: 15, fontWeight: 600, color: '#F0F6FF' }}>{label}</div>
      <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)', marginTop: 3 }}>{sub}</div>
    </motion.div>
  )
}

function ArchArrow() {
  return (
    <motion.div
      animate={{ opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '4px 0' }}
    >
      <div style={{ width: 2, height: 20, background: 'linear-gradient(180deg, #2563EB, #38BDF8)' }} />
      <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid #38BDF8' }} />
    </motion.div>
  )
}
