import { useState, useCallback } from 'react'
import { startSpeechRecognition } from '../utils/speechRecognition'
import { speakText } from '../utils/speechSynthesis'
import { useAssistant } from '../context/AssistantContext'

export function useVoiceConversation() {
  const { assistantLanguage, setAvatarState, setThinkingStep } = useAssistant()
  const [listening, setListening] = useState(false)

  const startListening = useCallback((onResultCallback) => {
    setListening(true)
    setAvatarState('listening')
    setThinkingStep('🎤 Listening to citizen voice...')

    startSpeechRecognition(
      assistantLanguage,
      (result) => {
        setListening(false)
        if (result && result.text) {
          setAvatarState('thinking')
          setThinkingStep('🧠 Processing query with Multi-Agent Engine...')
          onResultCallback(result.text)
        } else {
          setAvatarState('idle')
          setThinkingStep('')
        }
      },
      (err) => {
        console.warn('Voice conversation notice:', err)
        setListening(false)
        setAvatarState('idle')
        setThinkingStep('')
      },
      () => {
        setListening(false)
      }
    )
  }, [assistantLanguage, setAvatarState, setThinkingStep])

  const speakResponse = useCallback((text, onEnd) => {
    setAvatarState('speaking')
    setThinkingStep('🗣️ Janvi speaking response...')
    speakText(
      text,
      assistantLanguage,
      () => {
        setAvatarState('speaking')
      },
      () => {
        setAvatarState('idle')
        setThinkingStep('')
        if (onEnd) onEnd()
      },
      1.0
    )
  }, [assistantLanguage, setAvatarState, setThinkingStep])

  return { listening, startListening, speakResponse }
}
