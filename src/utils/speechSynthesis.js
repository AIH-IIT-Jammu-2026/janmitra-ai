import { supportsSpeechSynthesis } from './browserSpeechSupport'

let currentUtterance = null

export function getAvailableVoices() {
  if (!supportsSpeechSynthesis()) return []
  return window.speechSynthesis.getVoices()
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

  return null
}

export function speakText(text, langCode = 'hi-IN', rate = 1.0, onEndCallback = null) {
  if (!supportsSpeechSynthesis()) return false

  window.speechSynthesis.cancel() // Stop active speech

  const cleanText = text.replace(/[*#_`~]/g, '')
  const utterance = new SpeechSynthesisUtterance(cleanText)
  utterance.lang = langCode
  utterance.rate = rate

  const voice = findBestVoiceForLanguage(langCode)
  if (voice) {
    utterance.voice = voice
  }

  if (onEndCallback) {
    utterance.onend = onEndCallback
    utterance.onerror = onEndCallback
  }

  currentUtterance = utterance
  window.speechSynthesis.speak(utterance)
  return true
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
