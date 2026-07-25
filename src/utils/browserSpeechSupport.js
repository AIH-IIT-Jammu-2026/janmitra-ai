export function supportsSpeechSynthesis() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

export function supportsSpeechRecognition() {
  return (
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  )
}
