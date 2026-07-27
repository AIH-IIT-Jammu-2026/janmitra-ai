import { useState, useCallback, useRef } from 'react'

export function useCamera() {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const startCamera = useCallback(async (videoElement) => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false,
      })

      streamRef.current = mediaStream
      if (videoElement) {
        videoElement.srcObject = mediaStream
        videoElement.play()
        videoRef.current = videoElement
      }
      setIsCameraActive(true)
      return mediaStream
    } catch (err) {
      console.warn('Camera access notice:', err)
      setIsCameraActive(false)
      return null
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraActive(false)
  }, [])

  const captureFrameBlob = useCallback(() => {
    if (!videoRef.current || !isCameraActive) return null
    const video = videoRef.current
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.8)
    })
  }, [isCameraActive])

  return { isCameraActive, startCamera, stopCamera, captureFrameBlob, videoRef }
}
