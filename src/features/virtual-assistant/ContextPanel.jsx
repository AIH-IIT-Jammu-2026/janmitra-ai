import React from 'react'
import { motion } from 'framer-motion'
import AgentStatus from './AgentStatus'
import ThinkingTimeline from './ThinkingTimeline'

export default function ContextPanel({
  currentGoal = { title: 'Citizen Guidance', progress: 25 },
  activeAgents = [],
  thinkingStep = '',
  timelineEvents = [],
  currentWebsite = 'PM-KISAN Registration Portal',
}) {
  return (
    <div
      style={{
        width: 290,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        background: 'rgba(7,26,53,0.6)',
        border: '1px solid rgba(56,189,248,0.15)',
        borderRadius: 20,
        padding: 16,
        backdropFilter: 'blur(15px)',
        overflowY: 'auto',
      }}
    >
      {/* Task Goal Progress Bar */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
          Task Goal Progress
        </div>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: '#F0F6FF', marginBottom: 6 }}>{currentGoal.title}</div>
        <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
          <motion.div animate={{ width: `${currentGoal.progress}%` }} style={{ height: '100%', background: '#38BDF8' }} />
        </div>
        <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)', display: 'flex', justifyContent: 'space-between' }}>
          <span>Confidence: <strong style={{ color: '#34D399' }}>98%</strong></span>
          <span>{currentGoal.progress}%</span>
        </div>
      </div>



      {/* Active Agent Visualizer Pipeline */}
      <AgentStatus activeAgents={activeAgents} thinkingStep={thinkingStep} />

      {/* Thinking Timeline Log */}
      <ThinkingTimeline events={timelineEvents} thinkingStep={thinkingStep} />
    </div>
  )
}
