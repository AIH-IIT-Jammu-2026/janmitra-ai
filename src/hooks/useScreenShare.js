import { useState, useCallback } from 'react'
import { useAssistant } from '../context/AssistantContext'

export function useScreenShare() {
  const { setIsScreenSharing, setAvatarState, setThinkingStep } = useAssistant()
  const [stream, setStream] = useState(null)

  const startScreenShare = useCallback(async (onFrameCaptured) => {
    try {
      setAvatarState('looking')
      setThinkingStep('👀 Requesting browser screen share permission...')

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: 'always' },
        audio: false,
      })

      setStream(displayStream)
      setIsScreenSharing(true)
      setThinkingStep('👀 Connected! Analyzing active screen with Gemini Vision...')

      // Capture single canvas frame snapshot for Vision API
      const video = document.createElement('video')
      video.srcObject = displayStream
      video.play()

      video.onloadedmetadata = () => {
        setTimeout(() => {
          const canvas = document.createElement('canvas')
          canvas.width = video.videoWidth || 1280
          canvas.height = video.videoHeight || 720
          const ctx = canvas.getContext('2d')
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          
          canvas.toBlob((blob) => {
            if (blob && onFrameCaptured) {
              onFrameCaptured(blob)
            }
          }, 'image/jpeg', 0.8)
        }, 800)
      }

      displayStream.getVideoTracks()[0].onended = () => {
        setIsScreenSharing(false)
        setStream(null)
        setAvatarState('idle')
        setThinkingStep('')
      }
    } catch (err) {
      console.warn('Screen Share permission notice:', err)
      setIsScreenSharing(false)
      setAvatarState('idle')
      setThinkingStep('')
    }
  }, [setIsScreenSharing, setAvatarState, setThinkingStep])

  const stopScreenShare = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScreenSharing(false)
    setAvatarState('idle')
    setThinkingStep('')
  }, [stream, setIsScreenSharing, setAvatarState, setThinkingStep])

  return { isSharing: !!stream, startScreenShare, stopScreenShare }
}
