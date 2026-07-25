import React, { useState, useEffect } from 'react'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../../config/languages'
import { getCachedTranslation, setCachedTranslation } from '../../utils/translationCache'
import { speakText, pauseSpeech, resumeSpeech, stopSpeech, findBestVoiceForLanguage } from '../../utils/speechSynthesis'
import { supportsSpeechSynthesis } from '../../utils/browserSpeechSupport'

export default function VoicePlayerBar({ messageId, originalText }) {
  const [selectedLang, setSelectedLang] = useState(DEFAULT_LANGUAGE)
  const [rate, setRate] = useState(1.0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [loading, setLoading] = useState(false)
  const [displayedText, setDisplayedText] = useState(null)
  const [noVoiceWarning, setNoVoiceWarning] = useState(false)

  const isTTSAvailable = supportsSpeechSynthesis()

  const handlePlayOrTranslate = async (langOverride) => {
    const targetLang = langOverride || selectedLang
    setNoVoiceWarning(false)

    // 1. Check if same language as English original
    let textToSpeak = originalText
    if (targetLang !== 'en-IN') {
      // 2. Check translation cache
      const cached = getCachedTranslation(messageId, targetLang)
      if (cached) {
        textToSpeak = cached
        setDisplayedText(cached)
      } else {
        setLoading(true)
        try {
          const res = await fetch('http://localhost:8000/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: originalText, target_language: targetLang }),
          })
          if (res.ok) {
            const data = await res.json()
            textToSpeak = data.translated_text
            setCachedTranslation(messageId, targetLang, textToSpeak)
            setDisplayedText(textToSpeak)
          }
        } catch (err) {
          console.warn('Translation API warning:', err)
        } finally {
          setLoading(false)
        }
      }
    } else {
      setDisplayedText(null)
    }

    // 3. Verify Voice Existence in Browser
    const hasVoice = findBestVoiceForLanguage(targetLang)
    if (!hasVoice && targetLang !== 'en-IN') {
      setNoVoiceWarning(true)
    }

    // 4. Speak
    const success = speakText(textToSpeak, targetLang, rate, () => {
      setIsPlaying(false)
      setIsPaused(false)
    })

    if (success) {
      setIsPlaying(true)
      setIsPaused(false)
    }
  }

  const handlePause = () => {
    pauseSpeech()
    setIsPaused(true)
  }

  const handleResume = () => {
    resumeSpeech()
    setIsPaused(false)
  }

  const handleStop = () => {
    stopSpeech()
    setIsPlaying(false)
    setIsPaused(false)
  }

  const handleReplay = () => {
    handlePlayOrTranslate(selectedLang)
  }

  const handleLanguageChange = (newLang) => {
    setSelectedLang(newLang)
    if (isPlaying) {
      handlePlayOrTranslate(newLang)
    }
  }

  const toggleRate = () => {
    const nextRate = rate === 1.0 ? 1.25 : rate === 1.25 ? 0.8 : 1.0
    setRate(nextRate)
    if (isPlaying) {
      speakText(displayedText || originalText, selectedLang, nextRate, () => {
        setIsPlaying(false)
        setIsPaused(false)
      })
    }
  }

  if (!isTTSAvailable) {
    return (
      <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(240,246,255,0.4)', fontStyle: 'italic' }}>
        🔇 Voice synthesis unavailable in this browser.
      </div>
    )
  }

  return (
    <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(56,189,248,0.12)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {!isPlaying ? (
            <button
              onClick={() => handlePlayOrTranslate(selectedLang)}
              disabled={loading}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                border: 'none',
                borderRadius: 8,
                color: 'white',
                fontSize: 12,
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 0 12px rgba(37,99,235,0.4)',
              }}
            >
              {loading ? '🔄 Translating...' : '🔊 Read Aloud'}
            </button>
          ) : isPaused ? (
            <button
              onClick={handleResume}
              style={{
                padding: '6px 12px',
                background: 'rgba(16,185,129,0.2)',
                border: '1px solid rgba(16,185,129,0.4)',
                borderRadius: 8,
                color: '#34D399',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ▶ Resume
            </button>
          ) : (
            <button
              onClick={handlePause}
              style={{
                padding: '6px 12px',
                background: 'rgba(239,68,68,0.2)',
                border: '1px solid rgba(239,68,68,0.4)',
                borderRadius: 8,
                color: '#F87171',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ⏸ Pause
            </button>
          )}

          {isPlaying && (
            <>
              <button
                onClick={handleStop}
                style={{
                  padding: '6px 10px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 8,
                  color: 'rgba(240,246,255,0.7)',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                ■ Stop
              </button>
              <button
                onClick={handleReplay}
                style={{
                  padding: '6px 10px',
                  background: 'rgba(56,189,248,0.15)',
                  border: '1px solid rgba(56,189,248,0.3)',
                  borderRadius: 8,
                  color: '#38BDF8',
                  fontSize: 12,
                  cursor: 'pointer',
                }}
              >
                🔁 Replay
              </button>
            </>
          )}

          <button
            onClick={toggleRate}
            style={{
              padding: '6px 10px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(56,189,248,0.2)',
              borderRadius: 8,
              color: '#38BDF8',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ⚡ {rate}x
          </button>
        </div>

        {/* Language Dropdown Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>🌐 Voice Lang:</span>
          <select
            value={selectedLang}
            onChange={(e) => handleLanguageChange(e.target.value)}
            style={{
              padding: '5px 8px',
              background: 'rgba(11,36,71,0.8)',
              border: '1px solid rgba(56,189,248,0.25)',
              borderRadius: 8,
              color: '#F0F6FF',
              fontSize: 12,
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} style={{ background: '#071A35', color: '#fff' }}>
                {l.native} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Voice Unavailable Warning Badge */}
      {noVoiceWarning && (
        <div style={{ marginTop: 8, fontSize: 11, color: '#FCD34D', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.25)', padding: '4px 8px', borderRadius: 6 }}>
          ⚠️ No native browser voice installed for this language. Text translation displayed below.
        </div>
      )}

      {/* Translated Text Drawer */}
      {displayedText && selectedLang !== 'en-IN' && (
        <div
          style={{
            marginTop: 10,
            padding: '10px 12px',
            background: 'rgba(4,13,26,0.6)',
            border: '1px dashed rgba(56,189,248,0.2)',
            borderRadius: 8,
            fontSize: 13,
            color: '#38BDF8',
            lineHeight: 1.6,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(240,246,255,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>
            Translation ({selectedLang})
          </div>
          {displayedText}
        </div>
      )}
    </div>
  )
}
