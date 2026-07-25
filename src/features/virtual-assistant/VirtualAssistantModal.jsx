import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAssistant } from '../../context/AssistantContext'
import JanviAvatar from './JanviAvatar'
import LanguageSelection from './LanguageSelection'
import CallControls from './CallControls'
import SessionSummaryModal from './SessionSummaryModal'
import LogoIcon from '../../components/common/LogoIcon'
import { useVoiceConversation } from '../../hooks/useVoiceConversation'
import { useScreenShare } from '../../hooks/useScreenShare'
import { useCamera } from '../../hooks/useCamera'
import {
  startAssistantSessionAPI,
  sendAssistantMessageAPI,
  uploadScreenFrameAPI,
  endAssistantSessionAPI,
} from '../../services/virtualAssistantService'

export default function VirtualAssistantModal() {
  const {
    isOpen,
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
    thinkingStep,
    setThinkingStep,
    sessionSummary,
    setSessionSummary,
  } = useAssistant()

  const [showLanguageSelect, setShowLanguageSelect] = useState(true)
  const [textInput, setTextInput] = useState('')

  const { listening, startListening, speakResponse } = useVoiceConversation()
  const { isSharing, startScreenShare, stopScreenShare } = useScreenShare()
  const { isCameraActive, startCamera, stopCamera, captureFrameBlob, videoRef } = useCamera()

  if (!isOpen) return null

  const handleSelectLanguage = async (code) => {
    setAssistantLanguage(code)
    setShowLanguageSelect(false)

    try {
      const res = await startAssistantSessionAPI(code)
      setSessionId(res.session_id)
      const welcomeMsg = { id: Date.now(), type: 'assistant', text: res.greeting }
      setMessages([welcomeMsg])
      speakResponse(res.greeting)
    } catch (err) {
      console.warn('Error launching assistant:', err)
    }
  }

  const handleSendText = async (text) => {
    const q = text || textInput
    if (!q || !q.trim()) return

    setTextInput('')
    const userMsg = { id: Date.now(), type: 'user', text: q }
    setMessages((prev) => [...prev, userMsg])
    setAvatarState('thinking')
    setThinkingStep('🧠 Consulting Multi-Agent Engine...')

    try {
      const res = await sendAssistantMessageAPI(sessionId, q, assistantLanguage)
      const aiMsg = { id: Date.now() + 1, type: 'assistant', text: res.response }
      setMessages((prev) => [...prev, aiMsg])

      if (res.agents) setActiveAgents(res.agents)
      if (res.progress_pct) {
        setCurrentGoal((prev) => ({ ...prev, progress: res.progress_pct }))
      }

      speakResponse(res.response)
    } catch (err) {
      console.warn('Error processing query:', err)
      setAvatarState('idle')
      setThinkingStep('')
    }
  }

  const handleVoiceInputTrigger = () => {
    startListening((recognizedText) => {
      handleSendText(recognizedText)
    })
  }

  const handleScreenShareTrigger = () => {
    if (isSharing) {
      stopScreenShare()
    } else {
      startScreenShare(async (blob) => {
        setAvatarState('looking')
        setThinkingStep('👀 Looking at your screen frame...')
        const visionData = await uploadScreenFrameAPI(sessionId, blob, '', assistantLanguage)

        if (visionData.vision) {
          const v = visionData.vision
          if (v.context_chips) setContextChips(v.context_chips)
          if (v.goal_title) {
            setCurrentGoal({ title: v.goal_title, progress: v.progress_pct || 60, nextStep: 'Follow spatial guidance on screen' })
          }
          const guidanceMsg = { id: Date.now(), type: 'assistant', text: v.spatial_guidance || 'Screen analyzed successfully.' }
          setMessages((prev) => [...prev, guidanceMsg])
          speakResponse(guidanceMsg.text)
        }
      })
    }
  }

  const handleCameraToggleTrigger = async () => {
    if (isCameraActive) {
      stopCamera()
    } else {
      setAvatarState('looking')
      setThinkingStep('📷 Connecting citizen camera feed...')
      const stream = await startCamera(videoRef.current)

      if (stream) {
        setContextChips((prev) => ['📷 Camera Vision Active', ...prev.filter((c) => c !== '📷 Camera Vision Active')])
        setTimeout(async () => {
          const blob = await captureFrameBlob()
          if (blob) {
            setThinkingStep('👀 Janvi analyzing physical document shown to camera...')
            const visionData = await uploadScreenFrameAPI(sessionId, blob, 'Camera Document Analysis', assistantLanguage)
            if (visionData.vision) {
              const v = visionData.vision
              const msgText = v.spatial_guidance || 'I can see you clearly through your camera video feed.'
              const guidanceMsg = { id: Date.now(), type: 'assistant', text: msgText }
              setMessages((prev) => [...prev, guidanceMsg])
              speakResponse(msgText)
            }
          }
        }, 1200)
      }
    }
  }

  const handleEndSession = async () => {
    stopCamera()
    stopScreenShare()
    try {
      const summary = await endAssistantSessionAPI(sessionId)
      setSessionSummary(summary)
    } catch (err) {
      closeAssistant()
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 90,
        background: 'linear-gradient(180deg, #040d1a 0%, #071A35 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Top Video Call Header Bar */}
      <div
        style={{
          padding: '14px 30px',
          background: 'rgba(4,13,26,0.88)',
          borderBottom: '1px solid rgba(56,189,248,0.15)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoIcon size={36} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
              Janvi AI — Live Video Assistance
            </div>
            <div style={{ fontSize: 11, color: '#38BDF8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px #34D399' }} />
              LIVE CO-PILOT SESSION · MULTI-AGENT ENGINE · 22 LANGUAGES
            </div>
          </div>
        </div>

        <button
          onClick={handleEndSession}
          style={{
            background: 'linear-gradient(135deg, #DC2626, #991B1B)',
            border: 'none',
            borderRadius: 12,
            color: 'white',
            padding: '8px 18px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 0 16px rgba(220,38,38,0.4)',
          }}
        >
          📞 End Call
        </button>
      </div>

      {/* Main Container Body */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', padding: 20, gap: 20 }}>
        {showLanguageSelect ? (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LanguageSelection onSelectLanguage={handleSelectLanguage} />
          </div>
        ) : (
          <>
            {/* LEFT COLUMN: Animated Live Janvi Avatar & Citizen Camera Box */}
            <div
              style={{
                width: 320,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                background: 'rgba(7,26,53,0.6)',
                border: '1px solid rgba(56,189,248,0.15)',
                borderRadius: 20,
                padding: 18,
                backdropFilter: 'blur(15px)',
                overflowY: 'auto',
              }}
            >
              {/* Procedural Live2D Animated Avatar */}
              <JanviAvatar state={avatarState} />

              {/* Citizen Camera Video Feed Box */}
              <div
                style={{
                  background: 'rgba(11,36,71,0.8)',
                  border: `1px solid ${isCameraActive ? '#10B981' : 'rgba(56,189,248,0.2)'}`,
                  borderRadius: 16,
                  padding: 12,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: isCameraActive ? '#34D399' : 'rgba(240,246,255,0.6)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: isCameraActive ? '#10B981' : 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
                  {isCameraActive ? '📷 Citizen Feed (Janvi Seeing You)' : '📷 Camera Inactive'}
                </div>

                <video
                  ref={videoRef}
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: isCameraActive ? 140 : 0,
                    borderRadius: 12,
                    objectFit: 'cover',
                    background: '#000',
                    display: isCameraActive ? 'block' : 'none',
                    border: '1px solid rgba(56,189,248,0.3)',
                  }}
                />

                {!isCameraActive && (
                  <button
                    onClick={handleCameraToggleTrigger}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: 10,
                      background: 'rgba(37,99,235,0.15)',
                      border: '1px solid rgba(37,99,235,0.3)',
                      color: '#60A5FA',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Turn On Camera (Janvi Sees You)
                  </button>
                )}
              </div>

              {/* Context Chips */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                  Context Chips
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {contextChips.map((chip, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '4px 10px',
                        background: 'rgba(37,99,235,0.15)',
                        border: '1px solid rgba(37,99,235,0.3)',
                        borderRadius: 14,
                        fontSize: 11,
                        color: '#60A5FA',
                        fontWeight: 500,
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: Humanized Reasoning Pipeline & Conversation Log */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(7,26,53,0.4)',
                border: '1px solid rgba(56,189,248,0.15)',
                borderRadius: 20,
                padding: 20,
                backdropFilter: 'blur(15px)',
                position: 'relative',
              }}
            >
              {/* Humanized Thinking Pipeline Banner */}
              {thinkingStep && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '10px 18px',
                    background: 'rgba(37,99,235,0.2)',
                    border: '1px solid rgba(56,189,248,0.35)',
                    borderRadius: 14,
                    fontSize: 13,
                    color: '#60A5FA',
                    fontWeight: 600,
                    marginBottom: 14,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#38BDF8' }} />
                  <span>{thinkingStep}</span>
                </motion.div>
              )}

              {/* Messages Feed */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingRight: 6 }}>
                {messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '82%',
                      padding: '12px 18px',
                      borderRadius: m.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      background: m.type === 'user' ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'rgba(11,36,71,0.85)',
                      border: m.type === 'user' ? 'none' : '1px solid rgba(56,189,248,0.2)',
                      color: '#F0F6FF',
                      fontSize: 14,
                      lineHeight: 1.6,
                      boxShadow: '0 4px 20px rgba(4,13,26,0.4)',
                    }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              {/* Text Input Fallback Bar */}
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendText(textInput)}
                  placeholder="Talk to Janvi or type your query..."
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    borderRadius: 14,
                    background: 'rgba(11,36,71,0.85)',
                    border: '1px solid rgba(56,189,248,0.25)',
                    color: '#fff',
                    outline: 'none',
                    fontSize: 13,
                  }}
                />
                <button
                  onClick={() => handleSendText(textInput)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                    border: 'none',
                    color: 'white',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 0 16px rgba(37,99,235,0.4)',
                  }}
                >
                  Send
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Active Agents Radar & Task Goal Tracker */}
            <div
              style={{
                width: 280,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                background: 'rgba(7,26,53,0.6)',
                border: '1px solid rgba(56,189,248,0.15)',
                borderRadius: 20,
                padding: 20,
                backdropFilter: 'blur(15px)',
              }}
            >
              {/* Task Goal Progress Bar */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                  Current Task Goal
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#F0F6FF', marginBottom: 8 }}>{currentGoal.title}</div>
                <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
                  <motion.div animate={{ width: `${currentGoal.progress}%` }} style={{ height: '100%', background: '#38BDF8' }} />
                </div>
                <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Confidence: <strong style={{ color: '#34D399' }}>98%</strong></span>
                  <span>{currentGoal.progress}%</span>
                </div>
              </div>

              {/* Active Specialist Agents Radar List */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>
                  Active Specialists
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {activeAgents.map((ag) => (
                    <div
                      key={ag}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: 'rgba(11,36,71,0.6)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        borderRadius: 10,
                        fontSize: 12,
                        color: 'rgba(240,246,255,0.9)',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px #34D399' }} />
                        <span>{ag}</span>
                      </div>
                      <span style={{ fontSize: 10, color: '#34D399', fontWeight: 600 }}>Active</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Floating Call Control Dock Toolbar */}
      {!showLanguageSelect && (
        <div style={{ padding: '0 20px 20px', display: 'flex', justifyContent: 'center' }}>
          <CallControls
            listening={listening}
            onToggleMic={handleVoiceInputTrigger}
            isSharing={isSharing}
            onToggleScreenShare={handleScreenShareTrigger}
            isCameraActive={isCameraActive}
            onToggleCamera={handleCameraToggleTrigger}
            onUploadDoc={() => handleSendText('Upload Document AI Verification')}
            onChangeLanguage={() => setShowLanguageSelect(true)}
            onEndSession={handleEndSession}
          />
        </div>
      )}

      {/* Session Summary Modal */}
      {sessionSummary && (
        <SessionSummaryModal
          summaryData={sessionSummary}
          onClose={() => {
            setSessionSummary(null)
            closeAssistant()
          }}
        />
      )}
    </div>
  )
}
