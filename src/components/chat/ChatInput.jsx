import React, { useState } from 'react'

export default function ChatInput({ onSendMessage, disabled = false }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim() || disabled) return
    onSendMessage(input.trim())
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        background: 'rgba(11,36,71,0.6)',
        border: `1px solid ${input ? 'rgba(56,189,248,0.4)' : 'rgba(56,189,248,0.15)'}`,
        borderRadius: 16,
        padding: '6px 8px 6px 16px',
        boxShadow: input ? '0 0 20px rgba(56,189,248,0.1)' : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask JanMitra AI about government schemes, health, education, agriculture..."
        rows={1}
        disabled={disabled}
        style={{
          flex: 1,
          background: 'none',
          border: 'none',
          outline: 'none',
          color: '#F0F6FF',
          fontSize: 14,
          lineHeight: 1.5,
          resize: 'none',
          padding: '8px 0',
          fontFamily: 'Inter, sans-serif',
          maxHeight: 100,
        }}
      />

      <button
        type="submit"
        disabled={!input.trim() || disabled}
        style={{
          background: input.trim() && !disabled ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'rgba(37,99,235,0.15)',
          border: 'none',
          borderRadius: 10,
          color: input.trim() && !disabled ? 'white' : 'rgba(96,165,250,0.4)',
          cursor: input.trim() && !disabled ? 'pointer' : 'not-allowed',
          width: 38,
          height: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          flexShrink: 0,
          transition: 'all 0.2s',
        }}
      >
        ➔
      </button>
    </form>
  )
}
