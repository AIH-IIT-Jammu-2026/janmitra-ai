import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import AgentCards from './chat/AgentCards'
import ActionPlan from './chat/ActionPlan'
import SourceCards from './chat/SourceCards'
import EligibilityCard from './chat/EligibilityCard'
import VoicePlayerBar from './chat/VoicePlayerBar'
import PDFExportButton from './chat/PDFExportButton'

function TypingAnimation() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px' }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          flexShrink: 0,
          boxShadow: '0 0 16px rgba(37,99,235,0.5)',
        }}
      >
        🤖
      </div>
      <div className="glass-card" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#38BDF8' }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          <span style={{ fontSize: 12, color: 'rgba(240,246,255,0.6)', marginLeft: 6, fontWeight: 500 }}>
            Analyzing request with AI agents...
          </span>
        </div>
      </div>
    </div>
  )
}

export function UserMessage({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ display: 'flex', justifyContent: 'flex-end', padding: '6px 20px', marginBottom: 8 }}
    >
      <div
        style={{
          maxWidth: '72%',
          background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
          borderRadius: '18px 18px 4px 18px',
          padding: '12px 16px',
          color: 'white',
          fontSize: 14,
          lineHeight: 1.6,
          boxShadow: '0 0 20px rgba(37,99,235,0.3)',
        }}
      >
        {text}
      </div>
    </motion.div>
  )
}

export function AIMessage({ message }) {
  const contentText = message.text || message.content || ''
  const agentsList = message.agents || []
  const actionItems = message.actionPlan || message.action_plan || []
  const sourcesList = message.sources || []
  const messageId = message.id || Date.now()
  const [eligibilityData, setEligibilityData] = useState(message.eligibilityData || null)

  useEffect(() => {
    if (message.eligibilityData) {
      setEligibilityData(message.eligibilityData)
    }
  }, [message.eligibilityData])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ padding: '6px 20px', marginBottom: 12 }}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            flexShrink: 0,
            marginTop: 4,
            boxShadow: '0 0 16px rgba(37,99,235,0.5)',
          }}
        >
          🤖
        </div>
        <div style={{ flex: 1, maxWidth: '88%' }}>
          <div className="glass-card" style={{ padding: '20px' }}>
            {/* 1. Agent Cards */}
            <AgentCards agents={agentsList} />

            {/* 2. Main Response Text */}
            <div style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(240,246,255,0.9)' }}>
              <ReactMarkdown
                components={{
                  h3: ({ children }) => <h3 style={{ color: '#60A5FA', fontSize: 15, fontWeight: 600, marginBottom: 8, marginTop: 14 }}>{children}</h3>,
                  h2: ({ children }) => <h2 style={{ color: '#38BDF8', fontSize: 18, fontWeight: 700, marginBottom: 10, marginTop: 0 }}>{children}</h2>,
                  strong: ({ children }) => <strong style={{ color: '#F0F6FF', fontWeight: 600 }}>{children}</strong>,
                  ul: ({ children }) => <ul style={{ paddingLeft: 20, marginBottom: 8 }}>{children}</ul>,
                  li: ({ children }) => <li style={{ marginBottom: 4, color: 'rgba(240,246,255,0.85)' }}>{children}</li>,
                  p: ({ children }) => <p style={{ marginBottom: 10 }}>{children}</p>,
                  table: ({ children }) => (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12, fontSize: 13 }}>{children}</table>
                  ),
                  th: ({ children }) => (
                    <th style={{ padding: '6px 12px', textAlign: 'left', background: 'rgba(37,99,235,0.15)', color: '#60A5FA', fontWeight: 600, borderBottom: '1px solid rgba(56,189,248,0.15)' }}>{children}</th>
                  ),
                  td: ({ children }) => (
                    <td style={{ padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(240,246,255,0.8)' }}>{children}</td>
                  ),
                  code: ({ children, inline }) =>
                    inline ? (
                      <code style={{ background: 'rgba(56,189,248,0.1)', color: '#38BDF8', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>{children}</code>
                    ) : (
                      <pre style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 8, overflowX: 'auto', marginBottom: 8 }}>
                        <code style={{ color: '#38BDF8', fontSize: 13 }}>{children}</code>
                      </pre>
                    ),
                  hr: () => <hr style={{ border: 'none', borderTop: '1px solid rgba(56,189,248,0.12)', margin: '16px 0' }} />,
                  a: ({ href, children }) => (
                    <a href={href} style={{ color: '#38BDF8', textDecoration: 'underline' }} target="_blank" rel="noreferrer">
                      {children}
                    </a>
                  ),
                }}
              >
                {contentText}
              </ReactMarkdown>
            </div>

            {/* 3. Action Toolbar (Voice Player & PDF Export) */}
            {contentText && !message.isWelcome && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', marginTop: 12 }}>
                <VoicePlayerBar messageId={messageId} originalText={contentText} />
                <PDFExportButton messageData={{ ...message, text: contentText }} />
              </div>
            )}

            {/* 4. Document AI Eligibility Card */}
            {eligibilityData && (
              <EligibilityCard
                data={eligibilityData}
                onRecalculate={(updatedData) => setEligibilityData(updatedData)}
              />
            )}

            {/* 5. Action Plan */}
            <ActionPlan items={actionItems} />

            {/* 6. Official Sources */}
            <SourceCards sources={sourcesList} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export { TypingAnimation }
