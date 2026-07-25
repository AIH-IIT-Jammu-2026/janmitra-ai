import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAssistant } from '../../context/AssistantContext'
import JanviAvatar from './JanviAvatar'
import LanguageSelection from './LanguageSelection'
import CallControls from './CallControls'
import SessionSummaryModal from './SessionSummaryModal'
import ScreenHighlightOverlay from './ScreenHighlightOverlay'
import MultimodalTimeline from './MultimodalTimeline'
import ContextPanel from './ContextPanel'
import SmartFollowups from './SmartFollowups'
import EducationModePreset from './EducationModePreset'
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
    timelineEvents,
    addTimelineEvent,
    smartFollowups,
    currentWebsiteState,
  } = useAssistant()

  const [showLanguageSelect, setShowLanguageSelect] = useState(true)
  const [textInput, setTextInput] = useState('')
  const [callSeconds, setCallSeconds] = useState(0)
  const [screenHighlight, setScreenHighlight] = useState(null)

  const { listening, startListening, speakResponse } = useVoiceConversation()
  const { isSharing, startScreenShare, stopScreenShare } = useScreenShare()
  const { isCameraActive, startCamera, stopCamera, captureFrameBlob, videoRef } = useCamera()

  // Live Session Call Timer (00:01:42)
  useEffect(() => {
    let timer
    if (isOpen && !showLanguageSelect) {
      timer = setInterval(() => {
        setCallSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isOpen, showLanguageSelect])

  if (!isOpen) return null

  const formatTimer = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0')
    const s = String(sec % 60).padStart(2, '0')
    return `${m}:${s}`
  }

  const handleSelectLanguage = async (code) => {
    setAssistantLanguage(code)
    setShowLanguageSelect(false)
    addTimelineEvent('Language Selected: 22 Indian Languages Active', '🌐')

    try {
      const res = await startAssistantSessionAPI(code)
      setSessionId(res.session_id)

      const warmGreeting =
        code === 'hi-IN'
          ? "नमस्ते! मैं जनवी हूँ, आपकी एआई नागरिक सहायिका। मैं आपकी सहायता सरकारी फॉर्म भरने, दस्तावेज़ समझने, या किसी भी पोर्टल में कर सकती हूँ। आज आप क्या करना चाहेंगे?"
          : "Namaste! I'm Janvi, your AI Citizen Assistant. I can help you fill government forms, explain documents, answer study questions, or guide you through any website. What would you like help with today?"

      const welcomeMsg = { id: Date.now(), type: 'assistant', text: warmGreeting }
      setMessages([welcomeMsg])
      speakResponse(warmGreeting)
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
    setThinkingStep('🧠 Consulting Government & Specialist Agents...')
    addTimelineEvent(`User Query: "${q.slice(0, 24)}..."`, '💬')

    try {
      const res = await sendAssistantMessageAPI(sessionId, q, assistantLanguage)
      const aiMsg = { id: Date.now() + 1, type: 'assistant', text: res.response }
      setMessages((prev) => [...prev, aiMsg])

      if (res.agents) {
        setActiveAgents(res.agents)
        addTimelineEvent(`Agents Active: ${res.agents.join(', ')}`, '🤝')
      }
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
    addTimelineEvent('Microphone Input Active', '🎤')
    startListening((recognizedText) => {
      handleSendText(recognizedText)
    })
  }

  const handleScreenShareTrigger = () => {
    if (isSharing) {
      stopScreenShare()
      setScreenHighlight(null)
      addTimelineEvent('Screen Share Stopped', '🖥')
    } else {
      startScreenShare(async (blob) => {
        setAvatarState('looking')
        setThinkingStep('👀 Looking at your screen webpage...')
        addTimelineEvent('Screen Frame Captured & Analyzing...', '🔍')
        const visionData = await uploadScreenFrameAPI(sessionId, blob, '', assistantLanguage)

        if (visionData.vision) {
          const v = visionData.vision
          if (v.context_chips) setContextChips(v.context_chips)
          if (v.goal_title) {
            setCurrentGoal({ title: v.goal_title, progress: v.progress_pct || 60, nextStep: 'Click New Farmer Registration' })
          }
          setScreenHighlight('New Farmer Registration')
          addTimelineEvent('Spatial Highlight Overlay Active', '🔵')
          const guidanceMsg = {
            id: Date.now(),
            type: 'assistant',
            text: v.spatial_guidance || "I can see you're on the PM-KISAN portal. Click the green 'New Farmer Registration' button.",
          }
          setMessages((prev) => [...prev, guidanceMsg])
          speakResponse(guidanceMsg.text)
        }
      })
    }
  }

  const handleCameraToggleTrigger = async () => {
    if (isCameraActive) {
      stopCamera()
      addTimelineEvent('Camera Feed Stopped', '📷')
    } else {
      setAvatarState('looking')
      setThinkingStep('📷 Connecting citizen video feed...')
      addTimelineEvent('Citizen Camera Feed Connected', '📷')
      const stream = await startCamera(videoRef.current)

      if (stream) {
        setContextChips((prev) => ['📷 Camera Active', ...prev.filter((c) => c !== '📷 Camera Active')])
        setTimeout(async () => {
          const blob = await captureFrameBlob()
          if (blob) {
            setThinkingStep('👀 Janvi reading physical Aadhaar / Income certificate...')
            addTimelineEvent('Document Understanding Active', '📄')
            const visionData = await uploadScreenFrameAPI(sessionId, blob, 'Camera Document Analysis', assistantLanguage)
            if (visionData.vision) {
              const v = visionData.vision
              const msgText = v.spatial_guidance || 'I can see your document clearly through your camera feed.'
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

  const ALL_AGENTS_RADAR = [
    { name: 'Vision Agent', desc: 'Detecting UI & Spatial Elements' },
    { name: 'Government Agent', desc: 'Searching Scheme Database' },
    { name: 'Agriculture Agent', desc: 'Checking Eligibility' },
    { name: 'Healthcare Agent', desc: 'Standby' },
    { name: 'Education Agent', desc: 'Standby' },
    { name: 'Emergency Agent', desc: 'Standby' },
    { name: 'Legal Agent', desc: 'Standby' },
  ]

  const lastAssistantMessage = messages.filter((m) => m.type === 'assistant').slice(-1)[0]

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
          padding: '12px 28px',
          background: 'rgba(4,13,26,0.9)',
          borderBottom: '1px solid rgba(56,189,248,0.15)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoIcon size={34} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
              Janvi AI — Live Video Assistance
            </div>
            <div style={{ fontSize: 11, color: '#38BDF8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#EF4444' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 8px #EF4444' }} />
                🔴 LIVE VIDEO CALL
              </span>
              <span style={{ color: 'rgba(240,246,255,0.4)' }}>|</span>
              <span style={{ color: '#60A5FA', fontFamily: 'monospace', fontWeight: 700 }}>⏱ {formatTimer(callSeconds)}</span>
              <span style={{ color: 'rgba(240,246,255,0.4)' }}>|</span>
              <span style={{ color: '#34D399' }}>22 INDIAN LANGUAGES ACTIVE</span>
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
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden', padding: 18, gap: 18 }}>
        {showLanguageSelect ? (
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LanguageSelection onSelectLanguage={handleSelectLanguage} />
          </div>
        ) : (
          <>
            {/* LEFT COLUMN: Animated Live 3D Avatar & Camera Box & "Currently Viewing" */}
            <div
              style={{
                width: 310,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                background: 'rgba(7,26,53,0.6)',
                border: '1px solid rgba(56,189,248,0.15)',
                borderRadius: 20,
                padding: 16,
                backdropFilter: 'blur(15px)',
                overflowY: 'auto',
              }}
            >
              {/* 3D Stylized Animated Digital Mascot Avatar Engine */}
              <JanviAvatar state={avatarState} />

              {/* Citizen Camera Video Feed Box */}
              <div
                style={{
                  background: 'rgba(11,36,71,0.85)',
                  border: `1px solid ${isCameraActive ? '#10B981' : 'rgba(56,189,248,0.2)'}`,
                  borderRadius: 16,
                  padding: 10,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: isCameraActive ? '#34D399' : 'rgba(240,246,255,0.6)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: isCameraActive ? '#10B981' : 'rgba(255,255,255,0.3)', display: 'inline-block' }} />
                  {isCameraActive ? '📷 Citizen Feed (Janvi Seeing You)' : '📷 Camera Feed'}
                </div>

                <video
                  ref={videoRef}
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    height: isCameraActive ? 120 : 0,
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
                      padding: '8px 12px',
                      borderRadius: 10,
                      background: 'rgba(37,99,235,0.15)',
                      border: '1px solid rgba(37,99,235,0.3)',
                      color: '#60A5FA',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Enable Camera Feed
                  </button>
                )}
              </div>

              {/* "Currently Viewing" Smart Inspection Box */}
              <div
                style={{
                  background: 'rgba(11,36,71,0.7)',
                  border: '1px solid rgba(56,189,248,0.2)',
                  borderRadius: 16,
                  padding: 12,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, color: '#38BDF8', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                  Currently Viewing
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11.5, color: 'rgba(240,246,255,0.85)' }}>
                  <div>🏛 <strong>Portal:</strong> {currentWebsiteState}</div>
                  <div>📍 <strong>Location:</strong> Maharashtra, India</div>
                  <div>🌾 <strong>Domain:</strong> Agriculture Assistance</div>
                </div>
              </div>
            </div>

            {/* CENTER COLUMN: Live Assistant Speech Stage & Sequence Log & Presets */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: 'rgba(7,26,53,0.4)',
                border: '1px solid rgba(56,189,248,0.15)',
                borderRadius: 20,
                padding: 18,
                backdropFilter: 'blur(15px)',
                position: 'relative',
              }}
            >
              {/* Screen Vision Spatial Highlight Overlay */}
              {screenHighlight && <ScreenHighlightOverlay targetLabel={screenHighlight} />}

              {/* Live Real-Time Sequence Banner */}
              {thinkingStep && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(37,99,235,0.2)',
                    border: '1px solid rgba(56,189,248,0.35)',
                    borderRadius: 12,
                    fontSize: 12.5,
                    color: '#60A5FA',
                    fontWeight: 600,
                    marginBottom: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#38BDF8' }} />
                  <span>{thinkingStep}</span>
                </motion.div>
              )}

              {/* Active Spoken Guidance Box (Google Gemini Live Style) */}
              {lastAssistantMessage && (
                <div
                  style={{
                    padding: '14px 18px',
                    background: 'linear-gradient(135deg, rgba(11,36,71,0.9), rgba(7,26,53,0.95))',
                    border: '1px solid rgba(56,189,248,0.3)',
                    borderRadius: 16,
                    marginBottom: 12,
                    boxShadow: '0 0 25px rgba(4,13,26,0.6)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: '#38BDF8' }}>👩 Janvi Spoken Guidance</div>
                    {avatarState === 'speaking' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#10B981', fontSize: 11.5, fontWeight: 700 }}>
                        <span>🔊 Speaking...</span>
                      </div>
                    )}
                  </div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.55, color: '#F0F6FF', fontWeight: 500, margin: 0 }}>
                    "{lastAssistantMessage.text}"
                  </p>
                </div>
              )}

              {/* Phase 12 Smart Follow-ups Suggestions */}
              <SmartFollowups suggestions={smartFollowups} onSelect={handleSendText} />

              {/* Phase 6 Education Mode Presets */}
              <EducationModePreset onSelect={handleSendText} />

              {/* Conversation Log Feed */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10, paddingRight: 6 }}>
                {messages.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: m.type === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '82%',
                      padding: '8px 14px',
                      borderRadius: m.type === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      background: m.type === 'user' ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'rgba(11,36,71,0.65)',
                      border: m.type === 'user' ? 'none' : '1px solid rgba(56,189,248,0.18)',
                      color: '#F0F6FF',
                      fontSize: 13,
                      lineHeight: 1.5,
                    }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              {/* Voice / Text Prompt Bar */}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendText(textInput)}
                  placeholder="Speak to Janvi or type your question..."
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    borderRadius: 12,
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
                    padding: '10px 20px',
                    borderRadius: 12,
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

            {/* RIGHT COLUMN: ContextPanel (Task Goal, Currently Viewing, Agent Pipeline, Timeline) */}
            <ContextPanel
              currentGoal={currentGoal}
              activeAgents={activeAgents}
              thinkingStep={thinkingStep}
              timelineEvents={timelineEvents}
              currentWebsite={currentWebsiteState}
            />
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
