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
  const [thinkingStep, setThinkingStep] = useState('') // e.g. "👀 Understanding screen..."
  const [sessionSummary, setSessionSummary] = useState(null)

  const openAssistant = () => setIsOpen(true)
  const closeAssistant = () => setIsOpen(false)

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
