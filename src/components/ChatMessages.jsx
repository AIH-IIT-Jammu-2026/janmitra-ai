import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

function AgentBadge({ label, type }) {
  const colors = {
    blue: { bg: 'rgba(37,99,235,0.15)', color: '#60A5FA', border: 'rgba(37,99,235,0.3)' },
    green: { bg: 'rgba(16,185,129,0.12)', color: '#34D399', border: 'rgba(16,185,129,0.25)' },
    purple: { bg: 'rgba(139,92,246,0.12)', color: '#A78BFA', border: 'rgba(139,92,246,0.25)' },
    orange: { bg: 'rgba(245,158,11,0.15)', color: '#FCD34D', border: 'rgba(245,158,11,0.3)' },
  }
  const c = colors[type] || colors.blue
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 10px', borderRadius: 20,
        fontSize: 11, fontWeight: 600,
        background: c.bg, color: c.color,
        border: `1px solid ${c.border}`,
        marginRight: 6, marginBottom: 6,
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: c.color, display: 'inline-block', boxShadow: `0 0 6px ${c.color}` }} />
      {label}
    </motion.span>
  )
}

function TypingAnimation() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '16px 20px' }}>
      <div style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, flexShrink: 0, boxShadow: '0 0 16px rgba(37,99,235,0.5)',
      }}>🤖</div>
      <div className="glass-card" style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#38BDF8' }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          <span style={{ fontSize: 12, color: 'rgba(240,246,255,0.5)', marginLeft: 6 }}>Analyzing your request...</span>
        </div>
      </div>
    </div>
  )
}

function AgentActivationBanner({ agents }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 16px', marginBottom: 8,
        background: 'rgba(37,99,235,0.08)',
        borderRadius: 10,
        border: '1px solid rgba(37,99,235,0.15)',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ fontSize: 14 }}
      >⚡</motion.div>
      <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 500 }}>
        {agents.map((a, i) => (
          <span key={a}>
            <strong>{a}</strong>
            {i < agents.length - 1 ? ' + ' : ''}
          </span>
        ))} activated
      </span>
    </motion.div>
  )
}

export function UserMessage({ text }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ display: 'flex', justifyContent: 'flex-end', padding: '6px 20px', marginBottom: 4 }}
    >
      <div style={{
        maxWidth: '72%',
        background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
        borderRadius: '18px 18px 4px 18px',
        padding: '12px 16px',
        color: 'white',
        fontSize: 14,
        lineHeight: 1.6,
        boxShadow: '0 0 20px rgba(37,99,235,0.3)',
      }}>
        {text}
      </div>
    </motion.div>
  )
}

export function AIMessage({ message }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    const text = message.content
    let i = 0
    setDisplayed('')
    setDone(false)
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, 6)
    return () => clearInterval(interval)
  }, [message.content])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{ padding: '6px 20px', marginBottom: 4 }}
    >
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563EB, #38BDF8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, flexShrink: 0, marginTop: 4,
          boxShadow: '0 0 16px rgba(37,99,235,0.5)',
        }}>🤖</div>
        <div style={{ flex: 1, maxWidth: '85%' }}>
          {message.agents && <AgentActivationBanner agents={message.agents} />}
          <div className="glass-card" style={{ padding: '16px 20px' }}>
            {message.badges && (
              <div style={{ marginBottom: 12 }}>
                {message.badges.map(b => <AgentBadge key={b.label} label={b.label} type={b.type} />)}
              </div>
            )}
            <div style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(240,246,255,0.9)' }}>
              <ReactMarkdown
                components={{
                  h3: ({children}) => <h3 style={{ color: '#60A5FA', fontSize: 15, fontWeight: 600, marginBottom: 8, marginTop: 16 }}>{children}</h3>,
                  h2: ({children}) => <h2 style={{ color: '#38BDF8', fontSize: 17, fontWeight: 700, marginBottom: 10, marginTop: 20 }}>{children}</h2>,
                  strong: ({children}) => <strong style={{ color: '#F0F6FF', fontWeight: 600 }}>{children}</strong>,
                  ul: ({children}) => <ul style={{ paddingLeft: 20, marginBottom: 8 }}>{children}</ul>,
                  li: ({children}) => <li style={{ marginBottom: 4, color: 'rgba(240,246,255,0.85)' }}>{children}</li>,
                  p: ({children}) => <p style={{ marginBottom: 10 }}>{children}</p>,
                  table: ({children}) => (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 12, fontSize: 13 }}>{children}</table>
                  ),
                  th: ({children}) => (
                    <th style={{ padding: '6px 12px', textAlign: 'left', background: 'rgba(37,99,235,0.15)', color: '#60A5FA', fontWeight: 600, borderBottom: '1px solid rgba(56,189,248,0.15)' }}>{children}</th>
                  ),
                  td: ({children}) => (
                    <td style={{ padding: '6px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(240,246,255,0.8)' }}>{children}</td>
                  ),
                  code: ({children, inline}) => inline
                    ? <code style={{ background: 'rgba(56,189,248,0.1)', color: '#38BDF8', padding: '2px 6px', borderRadius: 4, fontSize: 13 }}>{children}</code>
                    : <pre style={{ background: 'rgba(0,0,0,0.3)', padding: 12, borderRadius: 8, overflowX: 'auto', marginBottom: 8 }}><code style={{ color: '#38BDF8', fontSize: 13 }}>{children}</code></pre>,
                  hr: () => <hr style={{ border: 'none', borderTop: '1px solid rgba(56,189,248,0.12)', margin: '16px 0' }} />,
                  a: ({href, children}) => <a href={href} style={{ color: '#38BDF8', textDecoration: 'underline' }} target="_blank" rel="noreferrer">{children}</a>,
                }}
              >
                {done ? displayed : displayed}
              </ReactMarkdown>
              {!done && <span style={{ color: '#38BDF8', animation: 'typing-cursor 1s infinite' }}>▋</span>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export { TypingAnimation }
