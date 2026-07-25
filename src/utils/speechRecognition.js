import { supportsSpeechRecognition } from './browserSpeechSupport'

export function startSpeechRecognition(langCode = 'en-IN', onResult, onError, onEnd) {
  if (!supportsSpeechRecognition()) {
    if (onError) onError('Speech Recognition is not supported in this browser.')
    return null
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()
  recognition.lang = langCode
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  recognition.onresult = (event) => {
    if (event.results && event.results.length > 0) {
      const result = event.results[0][0]
      const transcript = result.transcript
      const confidence = result.confidence || 0.95
      if (onResult) onResult({ text: transcript, language: langCode, confidence })
    }
  }

  recognition.onerror = (event) => {
    if (onError) onError(event.error)
  }

  recognition.onend = () => {
    if (onEnd) onEnd()
  }

  recognition.start()
  return recognition
}
