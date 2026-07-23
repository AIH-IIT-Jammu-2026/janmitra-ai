import React from 'react'
import Sidebar from '../components/layout/Sidebar'

const AGENTS = [
  { icon: '🔀', name: 'Intent Router', desc: 'Analyzes prompt and dispatches work to expert agents', color: '#38BDF8' },
  { icon: '🏛️', name: 'Government Schemes', desc: 'PM-KISAN, Ayushman Bharat, PMAY, state welfare', color: '#2563EB' },
  { icon: '🩺', name: 'Healthcare Agent', desc: 'Symptom guidance, hospitals, medical schemes', color: '#10B981' },
  { icon: '🎓', name: 'Education Agent', desc: 'Scholarships, career roadmaps, college admissions', color: '#8B5CF6' },
  { icon: '🌾', name: 'Agriculture Agent', desc: 'Mandi prices, crop insurance, farming advice', color: '#22C55E' },
  { icon: '🤝', name: 'Aggregator Agent', desc: 'Synthesizes insights into single cohesive response', color: '#F59E0B' },
]

export default function Architecture() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#040d1a', color: '#F0F6FF' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '40px 30px', overflowY: 'auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: '#38BDF8', marginBottom: 10 }}>
          JanMitra AI Multi-Agent Architecture
        </h1>
        <p style={{ color: 'rgba(240,246,255,0.7)', maxWidth: 700, marginBottom: 30, lineHeight: 1.6 }}>
          JanMitra AI uses a multi-agent orchestration architecture powered by FastAPI and Gemini. Queries are routed dynamically to domain expert agents and combined by an Aggregator.
        </p>

        {/* Architecture Flow Diagram */}
        <div
          style={{
            background: 'rgba(11,36,71,0.5)',
            border: '1px solid rgba(56,189,248,0.2)',
            borderRadius: 16,
            padding: 24,
            marginBottom: 30,
          }}
        >
          <div style={{ textAlign: 'center', fontWeight: 600, color: '#60A5FA', marginBottom: 20 }}>
            User Query ➔ Router Agent ➔ [ Expert Agents ] ➔ Aggregator Agent ➔ Final Response
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                style={{
                  padding: 16,
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${agent.color}40`,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{agent.icon}</div>
                <div style={{ fontWeight: 600, color: agent.color, fontSize: 15, marginBottom: 4 }}>{agent.name}</div>
                <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.6)' }}>{agent.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
