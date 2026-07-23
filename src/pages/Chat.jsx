import React, { useRef, useEffect } from 'react'
import Sidebar from '../components/layout/Sidebar'
import { UserMessage, AIMessage } from '../components/chat/ChatMessage'
import ChatInput from '../components/chat/ChatInput'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useChat } from '../hooks/useChat'

export default function Chat() {
  const { messages, loading, sendMessage } = useChat()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#040d1a' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
        {/* Header */}
        <div
          style={{
            padding: '16px 24px',
            background: 'rgba(4,13,26,0.8)',
            borderBottom: '1px solid rgba(56,189,248,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399' }} />
            <span style={{ fontWeight: 600, fontSize: 15, color: '#F0F6FF' }}>
              JanMitra AI Multi-Agent Workspace
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
          {messages.map((msg) =>
            msg.sender === 'user' ? (
              <UserMessage key={msg.id} text={msg.text} />
            ) : (
              <AIMessage key={msg.id} message={msg} />
            )
          )}
          {loading && <LoadingSpinner />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px 24px 24px', background: 'rgba(4,13,26,0.8)' }}>
          <ChatInput onSendMessage={sendMessage} disabled={loading} />
        </div>
      </div>
    </div>
  )
}
