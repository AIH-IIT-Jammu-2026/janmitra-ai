import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/layout/Sidebar'
import NeuralBackground from '../components/NeuralBackground'

const STAGES = [
  { label: 'Uploading...', icon: '⬆️', color: '#38BDF8', delay: 0 },
  { label: 'Analyzing document...', icon: '🔍', color: '#60A5FA', delay: 1200 },
  { label: 'OCR Complete', icon: '✅', color: '#34D399', delay: 2400 },
  { label: 'Summary Generated', icon: '📝', color: '#A78BFA', delay: 3600 },
  { label: 'Scheme Matched', icon: '🏛️', color: '#FCD34D', delay: 4800 },
]

const MOCK_DOCUMENTS = [
  { name: 'Income_Certificate_2024.pdf', icon: '📄', date: '2 days ago', status: 'Analyzed', scheme: 'PM-KISAN', confidence: '96%' },
  { name: 'Aadhaar_Card.jpg', icon: '🪪', date: '1 week ago', status: 'Verified', scheme: 'Ayushman Bharat', confidence: '99%' },
  { name: 'Land_Records_7_12.pdf', icon: '📋', date: '2 weeks ago', status: 'Analyzed', scheme: 'PM Fasal Bima', confidence: '92%' },
]

const MOCK_RESULT = {
  text: `**Document Analysis Complete** ✅

**Document Type:** Income Certificate
**Issued by:** Tehsildar Office, Pune District

**Extracted Information:**
- Applicant Name: Ramesh Kumar Sharma
- Annual Income: ₹1,20,000
- Family Members: 4
- District: Pune, Maharashtra
- Date of Issue: 15 March 2024

**Document Status:** ✅ Valid and Authentic

---

**Suggested Government Scheme:**
Based on your income certificate, you are **highly eligible** for:

1. **PM-KISAN** — ₹6,000/year direct benefit
2. **Ayushman Bharat** — Free healthcare up to ₹5 lakh
3. **PM Awas Yojana** — Housing subsidy

**Confidence Score: 96%**

**Missing Information:**
⚠️ Bank account details not visible in this document. Please ensure your bank account is linked to Aadhaar for direct benefit transfer.`,
}

export default function DocumentsPage() {
  const [dragging, setDragging] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [currentStage, setCurrentStage] = useState(-1)
  const [completed, setCompleted] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [displayedText, setDisplayedText] = useState('')

  const processFile = async (file) => {
    setUploadedFile(file)
    setProcessing(true)
    setCompleted(false)
    setCurrentStage(0)
    setDisplayedText('')

    for (let i = 0; i < STAGES.length; i++) {
      await new Promise(r => setTimeout(r, 1200))
      setCurrentStage(i)
    }

    await new Promise(r => setTimeout(r, 600))
    setProcessing(false)
    setCompleted(true)

    // Typewriter for result
    const text = MOCK_RESULT.text
    let idx = 0
    const interval = setInterval(() => {
      if (idx < text.length) {
        setDisplayedText(text.slice(0, idx + 1))
        idx++
      } else {
        clearInterval(interval)
      }
    }, 8)
  }

  const handleDrop = useCallback(e => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }, [])

  const handleFileInput = e => {
    const file = e.target.files[0]
    if (file) processFile(file)
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content" style={{ position: 'relative', minHeight: '100vh' }}>
        <NeuralBackground />
        <div style={{ position: 'relative', zIndex: 2, padding: '32px 32px', maxWidth: 1100 }}>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#F0F6FF', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 6 }}>
              📁 Document Intelligence
            </h1>
            <p style={{ color: 'rgba(240,246,255,0.5)', fontSize: 14 }}>Upload government documents, certificates, or medical reports for AI analysis</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

            {/* Upload Zone */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                style={{
                  border: `2px dashed ${dragging ? '#38BDF8' : 'rgba(56,189,248,0.2)'}`,
                  borderRadius: 20,
                  padding: '40px 24px',
                  textAlign: 'center',
                  background: dragging ? 'rgba(56,189,248,0.06)' : 'rgba(11,36,71,0.2)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  marginBottom: 20,
                }}
                onClick={() => document.getElementById('fileInput').click()}
              >
                <input id="fileInput" type="file" accept=".pdf,.jpg,.jpeg,.png,.docx" onChange={handleFileInput} style={{ display: 'none' }} />
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: 48, marginBottom: 12 }}>
                  {dragging ? '📥' : '☁️'}
                </motion.div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#F0F6FF', marginBottom: 8 }}>Drop your document here</h3>
                <p style={{ fontSize: 13, color: 'rgba(240,246,255,0.45)', marginBottom: 16 }}>
                  Supports PDF, JPG, PNG, DOCX
                </p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
                  {['Income Certificate', 'Aadhaar Card', 'Land Records', 'Medical Report'].map(t => (
                    <span key={t} style={{ padding: '4px 10px', borderRadius: 12, background: 'rgba(37,99,235,0.1)', color: '#60A5FA', fontSize: 11, border: '1px solid rgba(37,99,235,0.2)' }}>{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* Processing Stages */}
              <AnimatePresence>
                {(processing || completed) && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '20px 20px', marginBottom: 20 }}>
                    <div style={{ fontSize: 13, color: 'rgba(240,246,255,0.5)', marginBottom: 14, fontWeight: 500 }}>
                      📄 {uploadedFile?.name || 'document.pdf'}
                    </div>
                    {STAGES.map((stage, i) => (
                      <motion.div
                        key={stage.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: currentStage >= i ? 1 : 0.3, x: 0 }}
                        transition={{ delay: 0.1 * i }}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}
                      >
                        <motion.div
                          animate={currentStage === i && processing ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 0.5, repeat: currentStage === i ? Infinity : 0 }}
                          style={{ fontSize: 18 }}
                        >{stage.icon}</motion.div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, color: currentStage >= i ? '#F0F6FF' : 'rgba(240,246,255,0.3)', fontWeight: currentStage >= i ? 500 : 400 }}>{stage.label}</div>
                          {currentStage >= i && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              transition={{ duration: 0.8 }}
                              style={{ height: 2, background: `linear-gradient(90deg, ${stage.color}, transparent)`, borderRadius: 2, marginTop: 4 }}
                            />
                          )}
                        </div>
                        {currentStage > i && <span style={{ color: '#34D399', fontSize: 14 }}>✓</span>}
                        {currentStage === i && processing && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{ width: 14, height: 14, border: '2px solid rgba(56,189,248,0.3)', borderTopColor: '#38BDF8', borderRadius: '50%' }}
                          />
                        )}
                      </motion.div>
                    ))}

                    {completed && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}
                      >
                        <span style={{ fontSize: 18 }}>🎯</span>
                        <div>
                          <div style={{ fontSize: 13, color: '#34D399', fontWeight: 600 }}>Suggested Scheme: PM-KISAN</div>
                          <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.4)' }}>Confidence: 96% · Based on income certificate</div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Previous Docs */}
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: 'rgba(240,246,255,0.5)', marginBottom: 12, letterSpacing: 0.5 }}>PREVIOUS DOCUMENTS</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {MOCK_DOCUMENTS.map((doc, i) => (
                    <motion.div key={doc.name} whileHover={{ y: -2 }} className="glass-card" style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 22 }}>{doc.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: '#F0F6FF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doc.name}</div>
                        <div style={{ fontSize: 11, color: 'rgba(240,246,255,0.35)' }}>{doc.date} · {doc.scheme}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                        <span style={{ fontSize: 11, color: '#34D399', fontWeight: 600 }}>{doc.confidence}</span>
                        <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 8, background: 'rgba(16,185,129,0.1)', color: '#34D399', border: '1px solid rgba(16,185,129,0.2)' }}>{doc.status}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div>
              <AnimatePresence>
                {completed ? (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card" style={{ padding: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#60A5FA', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>🤖</span> AI Analysis Report
                    </h3>
                    <div style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(240,246,255,0.85)', whiteSpace: 'pre-wrap' }}>
                      {displayedText}
                      <span style={{ color: '#38BDF8', animation: 'typing-cursor 1s infinite' }}>▋</span>
                    </div>
                  </motion.div>
                ) : !processing ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🧠</div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#F0F6FF', marginBottom: 8 }}>Document AI Ready</h3>
                    <p style={{ fontSize: 13, color: 'rgba(240,246,255,0.45)', lineHeight: 1.6 }}>
                      Upload any government document, certificate, or medical report. Our AI will extract information, summarize content, and suggest relevant government schemes.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
                      {[
                        { icon: '📄', label: 'OCR Extraction' },
                        { icon: '📝', label: 'AI Summarization' },
                        { icon: '🏛️', label: 'Scheme Matching' },
                        { icon: '✅', label: 'Verification' },
                      ].map(item => (
                        <div key={item.label} style={{ padding: '12px', background: 'rgba(37,99,235,0.08)', borderRadius: 10, border: '1px solid rgba(37,99,235,0.12)', textAlign: 'center' }}>
                          <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                          <div style={{ fontSize: 12, color: 'rgba(240,246,255,0.6)' }}>{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ padding: 40, textAlign: 'center' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} style={{ fontSize: 48, marginBottom: 16, display: 'inline-block' }}>⚙️</motion.div>
                    <h3 style={{ fontSize: 16, color: '#60A5FA', fontWeight: 600 }}>Processing Document...</h3>
                    <p style={{ fontSize: 13, color: 'rgba(240,246,255,0.4)', marginTop: 8 }}>AI agents are analyzing your document</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
