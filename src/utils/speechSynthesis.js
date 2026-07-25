import { supportsSpeechSynthesis } from './browserSpeechSupport'

let cachedVoices = []

if (typeof window !== 'undefined' && supportsSpeechSynthesis()) {
  cachedVoices = window.speechSynthesis.getVoices()
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices()
    }
  }
}

export function getAvailableVoices() {
  if (!supportsSpeechSynthesis()) return []
  if (cachedVoices.length > 0) return cachedVoices
  cachedVoices = window.speechSynthesis.getVoices()
  return cachedVoices
}

export function findBestVoiceForLanguage(langCode) {
  const voices = getAvailableVoices()
  if (!voices || voices.length === 0) return null

  // 1. Exact match for language code e.g. hi-IN
  const exact = voices.find((v) => v.lang === langCode || v.lang.replace('_', '-') === langCode)
  if (exact) return exact

  // 2. Prefix match e.g. hi
  const prefix = langCode.split('-')[0]
  const langPrefixMatch = voices.find((v) => v.lang.startsWith(prefix))
  if (langPrefixMatch) return langPrefixMatch

  // 3. Fallback to English / default voice
  return voices.find((v) => v.lang.startsWith('en')) || voices[0]
}

export function speakText(text, langCode = 'en-IN', onStartCallback = null, onEndCallback = null, rate = 1.0) {
  if (!supportsSpeechSynthesis()) return false

  try {
    // Resume audio context if paused (Chrome/Edge autoplay policy on Windows)
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }
    window.speechSynthesis.cancel() // Stop previous speech

    const cleanText = text.replace(/[*#_`~]/g, '')
    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = langCode || 'en-IN'
    utterance.rate = typeof rate === 'number' ? rate : 1.0

    const voice = findBestVoiceForLanguage(langCode)
    if (voice) {
      utterance.voice = voice
    }

    if (onStartCallback) {
      utterance.onstart = onStartCallback
    }

    if (onEndCallback) {
      utterance.onend = onEndCallback
      utterance.onerror = (err) => {
        console.warn('Utterance speech error:', err)
        onEndCallback()
      }
    }

    window.speechSynthesis.speak(utterance)
    return true
  } catch (err) {
    console.warn('Error in speakText:', err)
    if (onEndCallback) onEndCallback()
    return false
  }
}

export function pauseSpeech() {
  if (supportsSpeechSynthesis() && window.speechSynthesis.speaking) {
    window.speechSynthesis.pause()
  }
}

export function resumeSpeech() {
  if (supportsSpeechSynthesis() && window.speechSynthesis.paused) {
    window.speechSynthesis.resume()
  }
}

export function stopSpeech() {
  if (supportsSpeechSynthesis()) {
    window.speechSynthesis.cancel()
  }
}
