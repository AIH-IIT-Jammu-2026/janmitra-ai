import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { generateCitizenActionPlanPDF } from '../../utils/pdf/generator'

export default function PDFExportButton({ messageData }) {
  const [downloading, setDownloading] = useState(false)
  const [downloaded, setDownloaded] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    try {
      generateCitizenActionPlanPDF(messageData)
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 4000)
    } catch (err) {
      console.warn('PDF export notice:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      disabled={downloading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '5px 12px',
        background: downloaded ? 'rgba(34,197,94,0.15)' : 'rgba(37,99,235,0.15)',
        border: `1px solid ${downloaded ? 'rgba(34,197,94,0.35)' : 'rgba(37,99,235,0.3)'}`,
        borderRadius: 16,
        color: downloaded ? '#4ADE80' : '#60A5FA',
        fontSize: 12,
        fontWeight: 600,
        cursor: downloading ? 'wait' : 'pointer',
        transition: 'all 0.2s',
      }}
    >
      <span>{downloaded ? '✅ PDF Exported' : downloading ? '⏳ Generating PDF...' : '📥 Download Action Plan (PDF)'}</span>
    </motion.button>
  )
}
