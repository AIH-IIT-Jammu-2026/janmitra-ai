import React from 'react'
import ReactMarkdown from 'react-markdown'
import AgentCards from './AgentCards'
import ActionPlan from './ActionPlan'

export function UserMessage({ text }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '6px 20px', marginBottom: 6 }}>
      <div
        style={{
          maxWidth: '75%',
          background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
          borderRadius: '18px 18px 4px 18px',
          padding: '12px 18px',
          color: 'white',
          fontSize: 14,
          lineHeight: 1.6,
          boxShadow: '0 4px 14px rgba(37,99,235,0.3)',
        }}
      >
        {text}
      </div>
    </div>
  )
}

export function AIMessage({ message }) {
  const { text, agents = [], actionPlan = [], sources = [] } = message

  return (
    <div style={{ padding: '6px 20px', marginBottom: 6 }}>
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
            boxShadow: '0 0 16px rgba(37,99,235,0.4)',
          }}
        >
          🤖
        </div>

        <div style={{ flex: 1, maxWidth: '85%' }}>
          <AgentCards agents={agents} />

          <div
            className="glass-card"
            style={{
              padding: '16px 20px',
              borderRadius: 14,
              border: '1px solid rgba(56,189,248,0.15)',
              background: 'rgba(11,36,71,0.4)',
            }}
          >
            <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(240,246,255,0.9)' }}>
              <ReactMarkdown
                components={{
                  h2: ({ children }) => <h2 style={{ color: '#38BDF8', fontSize: 16, fontWeight: 700, margin: '14px 0 8px' }}>{children}</h2>,
                  h3: ({ children }) => <h3 style={{ color: '#60A5FA', fontSize: 15, fontWeight: 600, margin: '12px 0 6px' }}>{children}</h3>,
                  p: ({ children }) => <p style={{ marginBottom: 10 }}>{children}</p>,
                  ul: ({ children }) => <ul style={{ paddingLeft: 20, marginBottom: 10 }}>{children}</ul>,
                  li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
                  strong: ({ children }) => <strong style={{ color: '#F0F6FF', fontWeight: 600 }}>{children}</strong>,
                  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" style={{ color: '#38BDF8', textDecoration: 'underline' }}>{children}</a>,
                }}
              >
                {text}
              </ReactMarkdown>
            </div>

            <ActionPlan items={actionPlan} />

            {sources && sources.length > 0 && (
              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 12 }}>
                <span style={{ color: 'rgba(240,246,255,0.5)', fontWeight: 600 }}>Sources: </span>
                {sources.map((src, i) => (
                  <a
                    key={i}
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#38BDF8', textDecoration: 'none', marginLeft: 8 }}
                  >
                    🔗 {src.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
