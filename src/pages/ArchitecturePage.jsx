import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import NeuralBackground from '../components/NeuralBackground'

const AGENTS = [
  { icon: '🏛️', name: 'Government Scheme Agent', color: '#2563EB' },
  { icon: '🩺', name: 'Healthcare Agent', color: '#10B981' },
  { icon: '🎓', name: 'Education Agent', color: '#8B5CF6' },
  { icon: '💼', name: 'Employment Agent', color: '#F59E0B' },
  { icon: '🌾', name: 'Agriculture Agent', color: '#22C55E' },
  { icon: '⚖️', name: 'Legal Agent', color: '#EF4444' },
  { icon: '🚨', name: 'Emergency Agent', color: '#DC2626' },
]

function FlowNode({ icon, label, sub, color, pulse }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      animate={pulse ? { boxShadow: ['0 0 10px rgba(56,189,248,0.2)', '0 0 30px rgba(56,189,248,0.6)', '0 0 10px rgba(56,189,248,0.2)'] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
      style={{
        padding: '16px 24px',
        background: `${color}15`,
        border: `1px solid ${color}35`,
        borderRadius: 14, textAlign: 'center', minWidth: 160,
        cursor: 'default',
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF' }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)', marginTop: 3 }}>{sub}</div>}
    </motion.div>
  )
}

function AnimatedArrow({ horizontal }) {
  return horizontal ? (
    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ height: 2, width: 30, background: 'linear-gradient(90deg, #2563EB, #38BDF8)' }} />
      <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '7px solid #38BDF8' }} />
    </motion.div>
  ) : (
    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0' }}>
      <div style={{ width: 2, height: 28, background: 'linear-gradient(180deg, #2563EB, #38BDF8)' }} />
      <div style={{ width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '7px solid #38BDF8' }} />
    </motion.div>
  )
}

export default function ArchitecturePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #040d1a 0%, #071A35 50%, #040d1a 100%)', position: 'relative' }}>
      <NeuralBackground />
      <div style={{ position: 'relative', zIndex: 2, padding: '40px' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #2563EB, #38BDF8)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🇮🇳</div>
            <span style={{ fontWeight: 700, fontSize: 17, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>JanMitra AI</span>
          </div>
          <Link to="/" style={{ color: 'rgba(240,246,255,0.5)', textDecoration: 'none', fontSize: 13 }}>← Back</Link>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 48 }}>
            <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>
              AI Architecture
            </h1>
            <p style={{ color: 'rgba(240,246,255,0.5)', fontSize: 15 }}>How JanMitra AI orchestrates multiple specialized agents to serve citizens</p>
          </motion.div>

          {/* Architecture Diagram */}
          <div className="glass-card" style={{ padding: 40, position: 'relative' }}>
            {/* Top: User */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
              <FlowNode icon="👤" label="Citizen" sub="Text · Voice · Image" color="#38BDF8" pulse />
            </div>
            <AnimatedArrow />

            {/* Intent Router */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
              <FlowNode icon="🔀" label="Intent Router" sub="NLU · Language Detection" color="#A78BFA" />
            </div>
            <AnimatedArrow />

            {/* Orchestrator */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
              <FlowNode icon="⚙️" label="Multi-Agent Orchestrator" sub="LangGraph · Parallel Execution" color="#2563EB" />
            </div>
            <AnimatedArrow />

            {/* Agents */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 0 }}>
              {AGENTS.map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ y: -4 }}
                  style={{
                    padding: '12px 12px',
                    background: `${agent.color}12`,
                    border: `1px solid ${agent.color}30`,
                    borderRadius: 12, textAlign: 'center',
                    minWidth: 88,
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{agent.icon}</div>
                  <div style={{ fontSize: 10, color: 'rgba(240,246,255,0.7)', fontWeight: 500, lineHeight: 1.3 }}>{agent.name.replace(' Agent', '')}</div>
                </motion.div>
              ))}
            </div>
            <AnimatedArrow />

            {/* RAG */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
              <FlowNode icon="🗄️" label="RAG Knowledge Layer" sub="FAISS · LangChain · Gov Docs" color="#34D399" />
            </div>
            <AnimatedArrow />

            {/* LLM */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 0 }}>
              <FlowNode icon="🧠" label="OpenAI GPT-4.1" sub="Generation · Reasoning" color="#FCD34D" />
            </div>
            <AnimatedArrow />

            {/* DB */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <FlowNode icon="🗃️" label="Supabase" sub="Users · Chats · Documents" color="#60A5FA" />
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/login" style={{ display: 'inline-block', padding: '13px 32px', background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderRadius: 12, color: 'white', textDecoration: 'none', fontSize: 15, fontWeight: 700, boxShadow: '0 0 24px rgba(37,99,235,0.5)' }}>
              Try JanMitra AI →
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
