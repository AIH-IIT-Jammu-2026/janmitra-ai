import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STAGES = [
  'Validating document file...',
  'Classifying document type with Vision AI...',
  'Extracting income & land criteria...',
  'Evaluating scheme rules & RAG guidelines...',
]

export default function DocumentUploadModal({ show, onClose, onVerified }) {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [stageIdx, setStageIdx] = useState(0)
  const [error, setError] = useState('')

  if (!show) return null

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (!selected) return

    setFile(selected)
    setError('')

    if (selected.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result)
      reader.readAsDataURL(selected)
    } else {
      setPreview(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image or PDF document to analyze.')
      return
    }

    setUploading(true)
    setError('')
    setStageIdx(0)

    const interval = setInterval(() => {
      setStageIdx((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev))
    }, 1200)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('http://localhost:8000/api/documents/verify-document', {
        method: 'POST',
        body: formData,
      })

      clearInterval(interval)

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.detail || 'Document analysis failed.')
      }

      const data = await res.json()
      onVerified(data)
      onClose()
    } catch (err) {
      clearInterval(interval)
      setError(err.message || 'Error processing document.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(4,13,26,0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-card"
          style={{ width: '100%', maxWidth: 480, padding: 28, position: 'relative' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
                📑
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif' }}>
                  Document AI Verification
                </h3>
                <p style={{ fontSize: 11, color: 'rgba(240,246,255,0.45)' }}>Upload Income, Aadhaar, or Farmer Certificate</p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={uploading}
              style={{ background: 'none', border: 'none', color: 'rgba(240,246,255,0.5)', cursor: 'pointer', fontSize: 18 }}
            >
              ✕
            </button>
          </div>

          {/* Upload Drop Zone */}
          {!uploading && (
            <div
              onClick={() => document.getElementById('doc-file-input').click()}
              style={{
                border: '2px dashed rgba(56,189,248,0.3)',
                borderRadius: 14,
                padding: 24,
                textAlign: 'center',
                background: 'rgba(11,36,71,0.4)',
                cursor: 'pointer',
                marginBottom: 20,
                transition: 'all 0.2s',
              }}
            >
              <input
                id="doc-file-input"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {preview ? (
                <div>
                  <img src={preview} alt="Thumbnail" style={{ maxHeight: 120, borderRadius: 8, margin: '0 auto 10px', boxShadow: '0 0 16px rgba(0,0,0,0.5)' }} />
                  <div style={{ fontSize: 13, color: '#38BDF8', fontWeight: 600 }}>{file?.name}</div>
                </div>
              ) : file ? (
                <div>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
                  <div style={{ fontSize: 13, color: '#38BDF8', fontWeight: 600 }}>{file.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.5)' }}>{(file.size / 1024).toFixed(1)} KB</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>📤</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#F0F6FF' }}>Click to select certificate file</div>
                  <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)', marginTop: 4 }}>Supports JPG, PNG, or PDF up to 10MB</div>
                </div>
              )}
            </div>
          )}

          {/* Upload Progress Animation */}
          {uploading && (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid rgba(56,189,248,0.2)', borderTopColor: '#38BDF8', margin: '0 auto 20px' }}
              />
              <div style={{ fontSize: 14, fontWeight: 600, color: '#38BDF8', marginBottom: 8 }}>
                {STAGES[stageIdx]}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)' }}>
                Processing document in-memory with Gemini Vision AI
              </div>
            </div>
          )}

          {error && (
            <div style={{ color: '#F87171', fontSize: 12, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', padding: '8px 12px', borderRadius: 8, marginBottom: 16, textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={onClose}
              disabled={uploading}
              style={{
                flex: 1,
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: 'rgba(240,246,255,0.7)',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={uploading || !file}
              style={{
                flex: 1.5,
                padding: '12px',
                background: file && !uploading ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'rgba(37,99,235,0.2)',
                border: 'none',
                borderRadius: 10,
                color: file && !uploading ? 'white' : 'rgba(240,246,255,0.4)',
                fontSize: 13,
                fontWeight: 700,
                cursor: file && !uploading ? 'pointer' : 'not-allowed',
                boxShadow: file && !uploading ? '0 0 16px rgba(37,99,235,0.4)' : 'none',
              }}
            >
              {uploading ? 'Analyzing...' : 'Analyze Eligibility ➔'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
