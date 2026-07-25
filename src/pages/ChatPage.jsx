import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import NeuralBackground from '../components/NeuralBackground'
import { UserMessage, AIMessage, TypingAnimation } from '../components/ChatMessages'
import LoadingOverlay from '../components/chat/LoadingOverlay'
import DocumentUploadModal from '../components/chat/DocumentUploadModal'
import { sendChatMessage } from '../clients/chatClient'

const SUGGESTED_PROMPTS = [
  { label: '🌾 PM-KISAN & Farmer Schemes', query: 'I am a farmer from Maharashtra. Which government schemes am I eligible for?' },
  { label: '🩺 Ayushman Bharat & Free Medicine', query: 'What is Ayushman Bharat health insurance and Jan Aushadhi generic medicines?' },
  { label: '🎓 NSP Scholarships & Education', query: 'Show me National Scholarship Portal schemes for SC/ST and college students' },
  { label: '🏠 PMAY Housing & Loans', query: 'How to apply for PMAY housing subsidy and PM SVANidhi street vendor loans?' },
]

export default function ChatPage() {
  const location = useLocation()
  const [messages, setMessages] = useState([
    {
      id: 0,
      type: 'ai',
      agents: ['Router Agent'],
      actionPlan: [
        { title: 'Explore Schemes', description: 'Ask about PM-KISAN, PMAY, or Ayushman Bharat' },
        { title: 'Upload Document AI', description: 'Click 📎 to verify Income / Farmer Certificate eligibility' },
      ],
      sources: [
        { name: 'MyScheme Portal', url: 'https://myscheme.gov.in' }
      ],
      content: `# Namaste! I am JanMitra AI 🇮🇳

I am your intelligent multi-agent citizen assistant. Ask me anything regarding **Government Schemes, Healthcare, Education, Employment, Agriculture, or Legal Guidance**.

*Powered by LangGraph multi-agent orchestration, Gemini Vision Document AI, and RAG vector retrieval.*`,
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [showDocModal, setShowDocModal] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const initialQuery = location.state?.initialQuery
    if (initialQuery) {
      setTimeout(() => handleSend(initialQuery), 300)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend(text) {
    const queryText = text || input
    if (!queryText || !queryText.trim() || loading) return

    setInput('')
    const userMsg = { id: Date.now(), type: 'user', content: queryText }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const data = await sendChatMessage(queryText)

      const aiMsg = {
        id: Date.now() + 1,
        type: 'ai',
        agents: data.agents || [],
        actionPlan: data.action_plan || [],
        sources: data.sources || [],
        content: data.response || 'No response text generated.',
      }
      setMessages((prev) => [...prev, aiMsg])
    } catch (err) {
      console.warn('Backend API connection warning:', err)
      const errorMsg = {
        id: Date.now() + 1,
        type: 'ai',
        agents: ['System Warning'],
        actionPlan: [
          { title: 'Start FastAPI Backend', description: 'Run: python -m uvicorn backend.main:app --reload', priority: 'High' }
        ],
        sources: [{ name: 'JanMitra AI API Contract', url: 'http://localhost:8000/docs' }],
        content: `⚠️ **Unable to connect to JanMitra AI Backend**\n\nCould not reach \`http://localhost:8000/api/chat\`.\n\n*Please ensure your FastAPI backend server is running on port 8000.*`,
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentVerified = (docResult) => {
    const userMsg = {
      id: Date.now(),
      type: 'user',
      content: `Uploaded ${docResult.document?.type || 'Certificate'} for Document AI Verification`,
    }

    const aiMsg = {
      id: Date.now() + 1,
      type: 'ai',
      agents: ['Document AI Vision Agent', 'Eligibility Rule Engine', 'RAG Retriever'],
      actionPlan: [
        { title: 'Review Extracted Profile', description: 'Check extracted income & land holding accuracy' },
        { title: 'Apply on Official Portals', description: 'Click Open Official Portal ↗ for matched schemes' },
      ],
      sources: [
        { name: 'MyScheme Portal', url: 'https://myscheme.gov.in' },
        { name: 'PM-KISAN Portal', url: 'https://pmkisan.gov.in' },
      ],
      content: `### 📄 Document Analysis & Eligibility Verification Complete!\n\nI parsed your **${docResult.document?.type || 'Certificate'}** issued by **${docResult.document?.issuer || 'Government Authority'}** using Gemini Vision AI and matched your profile against the curated government schemes knowledge base.`,
      eligibilityData: docResult,
    }

    setMessages((prev) => [...prev, userMsg, aiMsg])
  }

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-IN'
    recognition.interimResults = false

    setListening(true)
    recognition.start()

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setListening(false)
    }

    recognition.onerror = () => {
      setListening(false)
    }

    recognition.onend = () => {
      setListening(false)
    }
  }

  return (
    <div className="app-layout" style={{ display: 'flex', minHeight: '100vh', background: '#040d1a' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <NeuralBackground />

        {/* Top Header */}
        <div style={{
          position: 'relative', zIndex: 10,
          padding: '14px 24px',
          background: 'rgba(4,13,26,0.75)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(56,189,248,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
              boxShadow: '0 0 12px rgba(37,99,235,0.5)',
            }}>🤖</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>JanMitra AI Assistant</div>
              <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block', boxShadow: '0 0 6px #34D399' }} />
                Online · Vision Document AI & Multi-Agent RAG Active
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages List */}
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
                whileHover={{ scale: 1.03, borderColor: 'rgba(56,189,248,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSend(p.query)}
                style={{
                  padding: '7px 14px',
                  background: 'rgba(37,99,235,0.1)',
                  border: '1px solid rgba(37,99,235,0.25)',
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

        {/* Input Bar */}
        <div style={{
          position: 'relative', zIndex: 10,
          padding: '12px 20px 20px',
          background: 'rgba(4,13,26,0.8)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(56,189,248,0.1)',
        }}>
          <div style={{
            display: 'flex', gap: 10, alignItems: 'flex-end',
            background: 'rgba(11,36,71,0.6)',
            border: `1px solid ${input ? 'rgba(56,189,248,0.4)' : 'rgba(56,189,248,0.15)'}`,
            borderRadius: 16,
            padding: '4px 6px 4px 16px',
            boxShadow: input ? '0 0 20px rgba(56,189,248,0.12)' : 'none',
            transition: 'all 0.3s',
          }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend(input)
                }
              }}
              placeholder="Ask about government schemes or click 📎 to upload certificate..."
              rows={1}
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: '#F0F6FF', fontSize: 14, lineHeight: 1.5,
                resize: 'none', padding: '10px 4px',
                fontFamily: 'Inter, sans-serif',
                maxHeight: 120, overflowY: 'auto',
              }}
            />

            {/* Document Upload Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowDocModal(true)}
              style={{
                background: 'rgba(56,189,248,0.12)',
                border: '1px solid rgba(56,189,248,0.3)',
                borderRadius: 10, color: '#38BDF8',
                cursor: 'pointer', width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                flexShrink: 0, margin: '4px 2px',
              }}
              title="Upload Certificate for Document AI Eligibility Verification"
            >
              📎
            </motion.button>

            {/* Voice Input */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleVoiceInput}
              style={{
                background: listening ? 'rgba(239,68,68,0.25)' : 'rgba(37,99,235,0.12)',
                border: `1px solid ${listening ? 'rgba(239,68,68,0.5)' : 'rgba(37,99,235,0.25)'}`,
                borderRadius: 10, color: listening ? '#F87171' : '#60A5FA',
                cursor: 'pointer', width: 36, height: 36,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                flexShrink: 0, margin: '4px 2px',
              }}
              title="Speak query"
            >
              {listening ? (
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>🎙️</motion.span>
              ) : '🎤'}
            </motion.button>

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => handleSend(input)}
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
          <p style={{ fontSize: 11, color: 'rgba(240,246,255,0.3)', textAlign: 'center', marginTop: 8 }}>
            JanMitra AI matches queries using real RAG vector retrieval & LangGraph multi-agent orchestration.
          </p>
        </div>

        {/* Document Upload Modal */}
        <DocumentUploadModal
          show={showDocModal}
          onClose={() => setShowDocModal(false)}
          onVerified={handleDocumentVerified}
        />

        {/* Stage Loading Overlay */}
        <LoadingOverlay show={loading} />
      </div>
    </div>
  )
}
