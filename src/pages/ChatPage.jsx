import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import NeuralBackground from '../components/NeuralBackground'
import { UserMessage, AIMessage, TypingAnimation } from '../components/ChatMessages'
import { MOCK_RESPONSES, SUGGESTED_PROMPTS, detectIntent } from '../data/mockResponses'

const VOICE_QUERIES = [
  'I am a farmer from Maharashtra. Which government schemes am I eligible for?',
  'I have fever and headache. What should I do?',
  'Please review my resume and suggest improvements.',
  'Show me current mandi prices in Maharashtra.',
]

function MultiAgentAnimation({ show, agents }) {
  if (!show) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(4,13,26,0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', padding: 40 }}>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ fontSize: 48, marginBottom: 24 }}
        >🤖</motion.div>
        <h3 style={{ color: '#60A5FA', fontSize: 18, fontWeight: 600, marginBottom: 20, fontFamily: 'Space Grotesk, sans-serif' }}>
          Multi-Agent Orchestration Active
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <AgentFlowItem label="Intent Router" active={true} delay={0} />
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: 3 }}
            style={{ width: 2, height: 20, background: '#38BDF8' }} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {agents.map((a, i) => <AgentFlowItem key={a} label={a} active={true} delay={0.3 + i * 0.15} />)}
          </div>
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: 3, delay: 0.5 }}
            style={{ width: 2, height: 20, background: '#38BDF8' }} />
          <AgentFlowItem label="RAG Knowledge Base" active={true} delay={0.8} icon="🗄️" />
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.8, repeat: 3, delay: 1 }}
            style={{ width: 2, height: 20, background: '#38BDF8' }} />
          <AgentFlowItem label="Generating Response..." active={true} delay={1} icon="✨" />
        </div>
      </div>
    </motion.div>
  )
}

function AgentFlowItem({ label, active, delay, icon = '🤖' }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      style={{
        padding: '8px 18px',
        background: 'rgba(37,99,235,0.2)',
        border: '1px solid rgba(56,189,248,0.3)',
        borderRadius: 20, color: '#60A5FA',
        fontSize: 13, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 6,
        boxShadow: '0 0 12px rgba(37,99,235,0.3)',
      }}
    >
      <motion.span animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
        {icon}
      </motion.span>
      {label}
    </motion.div>
  )
}

export default function ChatPage() {
  const location = useLocation()
  const [messages, setMessages] = useState([
    {
      id: 0,
      type: 'ai',
      agents: [],
      badges: [],
      content: `# नमस्ते! I'm JanMitra AI 🇮🇳

I'm your intelligent citizen assistant, here to help you navigate government services, healthcare, education, employment, agriculture, legal matters, and emergency support.

**What can I help you with today?**

- 🏛️ Find government schemes you're eligible for
- 🩺 Get health guidance and hospital information
- 🎓 Discover scholarships and career paths
- 💼 Resume review and job matching
- 🌾 Crop prices, farming schemes, and agricultural advice
- ⚖️ Legal rights and consumer protection
- 🚨 Emergency assistance and SOS

*I understand English, Hindi, Marathi, Tamil, Telugu, and 18 more languages.*`,
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOrchestratorAnim, setShowOrchestratorAnim] = useState(false)
  const [activeAgents, setActiveAgents] = useState([])
  const [listening, setListening] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const initialQuery = location.state?.initialQuery
    if (initialQuery) {
      setTimeout(() => sendMessage(initialQuery), 300)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function sendMessage(text) {
    if (!text.trim() || loading) return
    setInput('')
    const userMsg = { id: Date.now(), type: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    // Detect intent
    const intent = detectIntent(text)
    const response = MOCK_RESPONSES[intent]
    const agents = response.agents

    // Show orchestrator animation
    setActiveAgents(agents)
    setShowOrchestratorAnim(true)
    await new Promise(r => setTimeout(r, 2000))
    setShowOrchestratorAnim(false)
    setLoading(false)

    const aiMsg = {
      id: Date.now() + 1,
      type: 'ai',
      agents: response.agents,
      badges: response.badges,
      content: response.content,
    }
    setMessages(prev => [...prev, aiMsg])
  }

  const handleVoice = async () => {
    setListening(true)
    await new Promise(r => setTimeout(r, 2000))
    setListening(false)
    const query = VOICE_QUERIES[Math.floor(Math.random() * VOICE_QUERIES.length)]
    setInput(query)
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
        <NeuralBackground />

        {/* Top bar */}
        <div style={{
          position: 'relative', zIndex: 10,
          padding: '14px 24px',
          background: 'rgba(4,13,26,0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(56,189,248,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              boxShadow: '0 0 12px rgba(37,99,235,0.5)',
            }}>🤖</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF' }}>JanMitra AI Assistant</div>
              <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
                Online · 7 Agents Active · 22 Languages
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['🔄', '📋', '⚙️'].map(icon => (
              <button key={icon} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, color: 'rgba(240,246,255,0.5)', cursor: 'pointer', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative', zIndex: 2, paddingTop: 16, paddingBottom: 8 }}>
          <AnimatePresence initial={false}>
            {messages.map(msg => msg.type === 'user'
              ? <UserMessage key={msg.id} text={msg.content} />
              : <AIMessage key={msg.id} message={msg} />
            )}
          </AnimatePresence>
          {loading && <TypingAnimation />}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 1 && (
          <div style={{ position: 'relative', zIndex: 2, padding: '0 20px 12px', display: 'flex', gap: 8, overflowX: 'auto', flexWrap: 'wrap' }}>
            {SUGGESTED_PROMPTS.map(p => (
              <motion.button
                key={p.label}
                whileHover={{ scale: 1.04, borderColor: 'rgba(56,189,248,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => sendMessage(p.query)}
                style={{
                  padding: '7px 14px',
                  background: 'rgba(37,99,235,0.08)',
                  border: '1px solid rgba(37,99,235,0.2)',
                  borderRadius: 20, color: '#60A5FA',
                  fontSize: 12, cursor: 'pointer',
                  whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                }}
              >
                {p.label}
              </motion.button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          position: 'relative', zIndex: 10,
          padding: '12px 20px 20px',
          background: 'rgba(4,13,26,0.7)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(56,189,248,0.08)',
        }}>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'flex-end',
            background: 'rgba(11,36,71,0.5)',
            border: `1px solid ${input ? 'rgba(56,189,248,0.35)' : 'rgba(56,189,248,0.12)'}`,
            borderRadius: 16,
            padding: '4px 6px 4px 16px',
            boxShadow: input ? '0 0 20px rgba(56,189,248,0.08)' : 'none',
            transition: 'all 0.3s',
          }}>
            {/* File upload */}
            <button style={{ background: 'none', border: 'none', color: 'rgba(240,246,255,0.3)', cursor: 'pointer', padding: '8px 4px', fontSize: 18, display: 'flex', alignItems: 'center' }} title="Upload file">📎</button>

            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage(input)
                }
              }}
              placeholder="Ask me about government schemes, health, education, jobs, farming, legal help..."
              rows={1}
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: '#F0F6FF', fontSize: 14, lineHeight: 1.5,
                resize: 'none', padding: '10px 4px',
                fontFamily: 'Inter, sans-serif',
                maxHeight: 120, overflowY: 'auto',
              }}
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
              }}
            />

            {/* Voice */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleVoice}
              style={{
                background: listening ? 'rgba(239,68,68,0.2)' : 'rgba(37,99,235,0.12)',
                border: `1px solid ${listening ? 'rgba(239,68,68,0.4)' : 'rgba(37,99,235,0.2)'}`,
                borderRadius: 10, color: listening ? '#F87171' : '#60A5FA',
                cursor: 'pointer', width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                flexShrink: 0, margin: '4px 2px',
              }}
            >
              {listening ? (
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>🎙️</motion.span>
              ) : '🎤'}
            </motion.button>

            {/* Send */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{
                background: input.trim() ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'rgba(37,99,235,0.1)',
                border: 'none',
                borderRadius: 10,
                color: input.trim() ? 'white' : 'rgba(96,165,250,0.3)',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0, margin: '4px 2px',
                boxShadow: input.trim() ? '0 0 16px rgba(37,99,235,0.5)' : 'none',
                transition: 'all 0.2s',
              }}
            >→</motion.button>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(240,246,255,0.25)', textAlign: 'center', marginTop: 8 }}>
            JanMitra AI provides information guidance only. Always verify with official government portals.
          </p>
        </div>

        {/* Orchestrator Animation Overlay */}
        <AnimatePresence>
          {showOrchestratorAnim && <MultiAgentAnimation show agents={activeAgents} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
