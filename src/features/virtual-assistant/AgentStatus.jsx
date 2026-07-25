import React from 'react'
import { motion } from 'framer-motion'

export default function AgentStatus({ activeAgents = [], thinkingStep = '' }) {
  const PIPELINE = [
    { name: 'Router Agent', icon: '🔀', desc: 'Intent Routing' },
    { name: 'Vision Agent', icon: '👁️', desc: 'UI & Screen Detection' },
    { name: 'Government Agent', icon: '🏛️', desc: 'Scheme Knowledge' },
    { name: 'Education Agent', icon: '🎓', desc: 'Study & PDF Tutor' },
    { name: 'Aggregator Agent', icon: '🤝', desc: 'Response Synthesis' },
  ]

  return (
    <div
      style={{
        background: 'rgba(11,36,71,0.7)',
        border: '1px solid rgba(56,189,248,0.2)',
        borderRadius: 16,
        padding: 14,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
        🟢 Active Multi-Agent Pipeline
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {PIPELINE.map((agent, i) => {
          const isActive = activeAgents.some(
            (act) => act.toLowerCase().includes(agent.name.toLowerCase().split(' ')[0])
          ) || (thinkingStep && i <= 2)

          return (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: isActive ? 'rgba(16,185,129,0.12)' : 'rgba(4,13,26,0.4)',
                border: `1px solid ${isActive ? 'rgba(16,185,129,0.35)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: 10,
                fontSize: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: isActive ? '#34D399' : 'rgba(240,246,255,0.2)', boxShadow: isActive ? '0 0 8px #34D399' : 'none' }} />
                <span style={{ fontWeight: 700, color: isActive ? '#34D399' : 'rgba(240,246,255,0.4)' }}>
                  {agent.icon} {agent.name}
                </span>
              </div>
              <span style={{ fontSize: 10, color: isActive ? '#67E8F9' : 'rgba(240,246,255,0.3)', fontWeight: 600 }}>
                {isActive ? 'Active' : 'Standby'}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
