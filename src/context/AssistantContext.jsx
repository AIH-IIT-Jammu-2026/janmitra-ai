import React, { createContext, useContext, useState } from 'react'

const AssistantContext = createContext()

export function AssistantProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [avatarState, setAvatarState] = useState('idle') // 'idle' | 'listening' | 'looking' | 'thinking' | 'speaking'
  const [assistantLanguage, setAssistantLanguage] = useState('en-IN')
  const [messages, setMessages] = useState([])
  const [activeAgents, setActiveAgents] = useState(['Router Agent', 'Janvi Assistant'])
  const [contextChips, setContextChips] = useState(['🌐 Citizen Assistant', '🤖 Multi-Agent Active'])
  const [currentGoal, setCurrentGoal] = useState({ title: 'Citizen Guidance', progress: 25, nextStep: 'Ask a question or share screen' })
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [thinkingStep, setThinkingStep] = useState('')
  const [sessionSummary, setSessionSummary] = useState(null)

  // Phase 11 & Phase 12 Additions: Multimodal Timeline Log & Smart Follow-ups
  const [timelineEvents, setTimelineEvents] = useState([
    { time: '00:01', label: 'Session Started', icon: '🚀' },
    { time: '00:02', label: 'Multi-Agent Router Active', icon: '🔀' },
  ])
  const [smartFollowups, setSmartFollowups] = useState([
    'Fill the next section with me',
    'Explain in Marathi / Hindi',
    'Download Action Plan checklist',
  ])
  const [currentWebsiteState, setCurrentWebsiteState] = useState('PM-KISAN Registration Portal')

  const openAssistant = () => setIsOpen(true)
  const closeAssistant = () => setIsOpen(false)

  const addTimelineEvent = (label, icon = '⚡') => {
    const now = new Date()
    const timeStr = `${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
    setTimelineEvents((prev) => [{ time: timeStr, label, icon }, ...prev.slice(0, 7)])
  }

  return (
    <AssistantContext.Provider
      value={{
        isOpen,
        openAssistant,
        closeAssistant,
        sessionId,
        setSessionId,
        avatarState,
        setAvatarState,
        assistantLanguage,
        setAssistantLanguage,
        messages,
        setMessages,
        activeAgents,
        setActiveAgents,
        contextChips,
        setContextChips,
        currentGoal,
        setCurrentGoal,
        isScreenSharing,
        setIsScreenSharing,
        thinkingStep,
        setThinkingStep,
        sessionSummary,
        setSessionSummary,
        timelineEvents,
        setTimelineEvents,
        addTimelineEvent,
        smartFollowups,
        setSmartFollowups,
        currentWebsiteState,
        setCurrentWebsiteState,
      }}
    >
      {children}
    </AssistantContext.Provider>
  )
}

export function useAssistant() {
  const context = useContext(AssistantContext)
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider')
  }
  return context
}
